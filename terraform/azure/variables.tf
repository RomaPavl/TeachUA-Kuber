variable "location" {
  description = "Location Azure"
  default     = "westeurope"
}
variable "resource_group_name" {
  description = "Name of resource group"
}
variable "admin_username" {
  description = "Logan for admin in VM"
}
variable "vm_size" {
  description = "Tyoe of VM"
  default     = "Standard_B1s"
}
variable "ssh_public_key" {
  description = "Public ssh for vm"
}
variable "frontend_name" {
  description = "Name of frontend VM"
}
variable "backend_name" {
  description = "Name of backend VM"
}
variable "monitoring_name" {
  description = "Name of backend VM"
}
variable "key_vault_name" {
  description = "Name Azure Key Vault"
  default     = "yura-keyvault"
}
variable "db_password" {
  description = "Password for db"
}
variable "postgres_server_name" {
  description = "Name of PostgreSQL Server"
}
variable "postgres_admin_user" {
  description = "Name of admin PostgreSQL"
}
variable "postgres_admin_password" {
  description = "Password for admin PostgreSQL"
}
variable "postgres_db_name" {
  description = "Name of db PostgreSQL"
}
variable "vnet_name" { 
  type = string 
  default = "yura-vnet" 
}
variable "address_space" { 
  type = list(string)
  default = ["10.0.0.0/16"] 
}

variable "subnets" {
  type = list(object({ 
    name = string 
    address_prefix = string 
  }))
  default = [
    { 
      name = "default" 
      address_prefix = "10.0.1.0/24" 
    }
  ]
}
variable "nsg_name" {
  type    = string
  default = "yura-nsg"
}
variable "security_rules" {
  type = list(object({
    name                       = string
    priority                   = number
    direction                  = string
    access                     = string
    protocol                   = string
    source_address_prefix      = string
    source_port_range          = string
    destination_address_prefix = string
    destination_port_range     = string
  }))
  default = [
    {
      name                       = "AllowSSH"
      priority                   = 1001
      direction                  = "Inbound"
      access                     = "Allow"
      protocol                   = "Tcp"
      source_address_prefix      = "*"
      source_port_range          = "*"
      destination_address_prefix = "*"
      destination_port_range     = "22"
    },
    {
      name                       = "AllowHTTP"
      priority                   = 1002
      direction                  = "Inbound"
      access                     = "Allow"
      protocol                   = "Tcp"
      destination_port_range     = "80"
      source_address_prefix      = "*"
      destination_address_prefix = "*"
      source_port_range          = "*"
    }
  ]
}

locals {
  additional_rules = [
    {
      name                       = "AllowWeb"
      priority                   = 100
      direction                  = "Inbound"
      access                     = "Allow"
      protocol                   = "Tcp"
      source_address_prefix      = "*"
      source_port_range          = "*"
      destination_address_prefix = module.vm.public_ips["frontend"]
      destination_port_range     = "443"
    },
    {
      name                       = "AllowFrontendToBackend"
      priority                   = 110
      direction                  = "Inbound"
      access                     = "Allow"
      protocol                   = "Tcp"
      source_address_prefix      = module.vm.private_ips["frontend"]
      source_port_range          = "*"
      destination_address_prefix = module.vm.private_ips["backend"]
      destination_port_range     = "8080"
    },
    {
      name                       = "AllowMonitoringHTTP1"
      priority                   = 120
      direction                  = "Inbound"
      access                     = "Allow"
      protocol                   = "Tcp"
      source_address_prefix      = "*"
      source_port_range          = "*"
      destination_address_prefix = "*"
      destination_port_range     = "3000-3030"
    }, 
    {
      name                       = "AllowMonitoringHTTP2"
      priority                   = 121
      direction                  = "Inbound"
      access                     = "Allow"
      protocol                   = "Tcp"
      source_address_prefix      = "*" 
      source_port_range          = "*"
      destination_address_prefix = "*"
      destination_port_range     = "9090"
    },
    {
      name                       = "AllowNodeExporterFromFrontend"
      priority                   = 130
      direction                  = "Inbound"
      access                     = "Allow"
      protocol                   = "Tcp"
      source_address_prefix      = module.vm.private_ips["frontend"]
      source_port_range          = "*"
      destination_address_prefix = module.vm.private_ips["monitoring"]
      destination_port_range     = "9100"
    },
    {
      name                       = "AllowNodeExporterFromBackend"
      priority                   = 131
      direction                  = "Inbound"
      access                     = "Allow"
      protocol                   = "Tcp"
      source_address_prefix      = module.vm.private_ips["backend"]
      source_port_range          = "*"
      destination_address_prefix = module.vm.private_ips["monitoring"]
      destination_port_range     = "9100"
    },
    {
      name                       = "AllowTelegrafFromFrontend"
      priority                   = 132
      direction                  = "Inbound"
      access                     = "Allow"
      protocol                   = "Tcp"
      source_address_prefix      = module.vm.private_ips["frontend"]
      source_port_range          = "*"
      destination_address_prefix = module.vm.private_ips["monitoring"]
      destination_port_range     = "9126"
    },
    {
      name                       = "AllowTelegrafFromBackend"
      priority                   = 133
      direction                  = "Inbound"
      access                     = "Allow"
      protocol                   = "Tcp"
      source_address_prefix      = module.vm.private_ips["backend"]
      source_port_range          = "*"
      destination_address_prefix = module.vm.private_ips["monitoring"]
      destination_port_range     = "9126"
    }
  ]
  all_rules = concat(var.security_rules, local.additional_rules)
}
