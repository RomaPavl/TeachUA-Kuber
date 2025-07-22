variable "resource_group_name" {
  description = "Name of resource group"
  type        = string
}
variable "location" {
  description = "Location for Key Vault"
  type        = string
}
variable "key_vault_name" {
  description = "Name of Azure Key Vault"
  type        = string
}
variable "tenant_id" {
  description = "Tenant ID Azure"
  type        = string
}
variable "object_id" {
  description = "Object ID"
  type        = string
}
variable "ssh_public_key_value" {
  description = "Value of SSH-key"
  type        = string
}
variable "ssh_public_key_secret_name" {
  description = "Name of secret for SSH-key in Key Vault"
  type        = string
  default     = "ssh-public-key"
}
variable "db_password_value" {
  description = "Value of db password"
  type        = string
}
variable "db_password_secret_name" {
  description = "Name of secret for password db in Key Vault"
  type        = string
  default     = "db-password"
}

variable "postgres_admin_user_secret_name" {
  description = "Name of secret for password db in Key Vault"
  type        = string
  default     = "pgadmin"
}

variable "postgres_admin_user_value" {
  description = "Value of db password"
  type        = string
}

variable "postgres_admin_password_secret_name" {
  description = "Name of secret for password db in Key Vault"
  type        = string
  default     = "pg-pass"
}

variable "postgres_admin_password_value" {
  description = "Value of db password"
  type        = string
}

variable "postgres_db_name_value" {
  description = "Value of db password"
  type        = string
}

variable "postgres_db_name_secret_name" {
  description = "Name of secret for password db in Key Vault"
  type        = string
  default     = "db-name"
}
variable "db_host_value" {
  type = string
}