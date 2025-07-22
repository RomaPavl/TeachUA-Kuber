
resource "azurerm_resource_group" "main" {
  name     = var.resource_group_name
  location = var.location
}

data "azurerm_client_config" "current" {}

module "network" {
  source              = "./modules/network"
  resource_group_name = azurerm_resource_group.main.name
  location            = var.location

  vnet_name      = var.vnet_name
  address_space  = var.address_space
  subnets = [
    { name = "default", address_prefix = "10.0.1.0/24" }
  ]    
}

module "security" {
  source              = "./modules/security_rules"
  resource_group_name = azurerm_resource_group.main.name
  location            = var.location

  nsg_name = var.nsg_name
  rules    = local.all_rules   # список об’єктів з правилами
}

module "vm" {
  source              = "./modules/vm"
  resource_group_name = azurerm_resource_group.main.name
  location            = var.location
  admin_username      = var.admin_username
  ssh_public_key      = var.ssh_public_key
  vm_size             = var.vm_size

  vms = {
    frontend = {
      name      = var.frontend_name
      subnet_id = module.network.subnet_ids["default"]
      nsg_id    = module.security.nsg_id
      public_ip = true
    }
    backend = {
      name      = var.backend_name
      subnet_id = module.network.subnet_ids["default"]
      nsg_id    = module.security.nsg_id
      public_ip = true
    }
    monitoring = {
      name      = var.monitoring_name
      subnet_id = module.network.subnet_ids["default"]
      nsg_id    = module.security.nsg_id
      public_ip = true
    }
  }
}

resource "azurerm_dns_zone" "public" {
  name                = "teachua.com"  # Ваш домен
  resource_group_name = azurerm_resource_group.main.name
}

# A-запис для фронтенду
resource "azurerm_dns_a_record" "frontend" {
  name                = "@"
  zone_name           = azurerm_dns_zone.public.name
  resource_group_name = azurerm_resource_group.main.name
  ttl                 = 300
  records             = [module.vm.public_ips["frontend"]]
}

module "keyvault" {
  source  = "./modules/keyvault"
  depends_on = [azurerm_resource_group.main]

  resource_group_name       = azurerm_resource_group.main.name
  location                  = var.location
  key_vault_name            = var.key_vault_name
  tenant_id                 = data.azurerm_client_config.current.tenant_id
  object_id                 = data.azurerm_client_config.current.object_id
  ssh_public_key_value      = var.ssh_public_key
  db_password_value         = var.db_password
  db_host_value             = module.postgres.db_host
  postgres_admin_user_value = var.postgres_admin_user
  postgres_admin_password_value  = var.postgres_admin_password
  postgres_db_name_value          = var.postgres_db_name
}

module "postgres" {
  source  = "./modules/postgres"
  depends_on = [azurerm_resource_group.main]
  resource_group_name    = azurerm_resource_group.main.name
  location               = var.location
  postgres_server_name   = var.postgres_server_name
  postgres_admin_user    = var.postgres_admin_user
  postgres_admin_password= var.postgres_admin_password
  postgres_db_name       = var.postgres_db_name
  allowed_ips = {
    backend = module.vm.public_ips["backend"]
    monitoring = module.vm.public_ips["monitoring"]
  }
}

