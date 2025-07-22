resource "azurerm_key_vault" "main" {
  name                = var.key_vault_name
  location            = var.location
  resource_group_name = var.resource_group_name
  tenant_id           = var.tenant_id
  sku_name            = "standard"
  purge_protection_enabled = false
}

resource "azurerm_key_vault_access_policy" "current_user" {
  key_vault_id = azurerm_key_vault.main.id
  tenant_id    = var.tenant_id
  object_id    = var.object_id

  secret_permissions = [
    "Get", "Set", "List", "Delete", "Purge", "Recover"
  ]
}

resource "azurerm_key_vault_secret" "ssh_key" {
  name         = var.ssh_public_key_secret_name
  value        = var.ssh_public_key_value
  key_vault_id = azurerm_key_vault.main.id
  depends_on   = [azurerm_key_vault_access_policy.current_user]
}

resource "azurerm_key_vault_secret" "db_pass" {
  name         = var.db_password_secret_name
  value        = var.db_password_value
  key_vault_id = azurerm_key_vault.main.id
  depends_on   = [azurerm_key_vault_access_policy.current_user]
}

resource "azurerm_key_vault_secret" "postgres_db_name" {
  name         = var.postgres_db_name_secret_name
  value        = var.postgres_db_name_value
  key_vault_id = azurerm_key_vault.main.id
  depends_on   = [azurerm_key_vault_access_policy.current_user]
}

resource "azurerm_key_vault_secret" "postgres_admin_user" {
  name         = var.postgres_admin_user_secret_name
  value        = var.postgres_admin_user_value
  key_vault_id = azurerm_key_vault.main.id
  depends_on   = [azurerm_key_vault_access_policy.current_user]
}

resource "azurerm_key_vault_secret" "postgres_admin_password" {
  name         = var.postgres_admin_password_secret_name
  value        = var.postgres_admin_password_value
  key_vault_id = azurerm_key_vault.main.id
  depends_on   = [azurerm_key_vault_access_policy.current_user]
}

resource "azurerm_key_vault_secret" "db_host_value" {
  name         = "db-host"
  value        = var.db_host_value  # Використовуємо передану змінну
  key_vault_id = azurerm_key_vault.main.id
}
