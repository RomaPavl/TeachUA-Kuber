variable "resource_group_name" {
  description = "Resource group name for PostgreSQL"
  type        = string
}

variable "location" {
  description = "Location of PostgreSQL"
  type        = string
}

variable "postgres_server_name" {
  description = "Name of PostgreSQL server"
  type        = string
}

variable "postgres_admin_user" {
  description = "Admin login for PostgreSQL"
  type        = string
}

variable "postgres_admin_password" {
  description = "Admin password for PostgreSQL"
  type        = string
  sensitive   = true
}

variable "postgres_db_name" {
  description = "Name of the PostgreSQL database"
  type        = string
}

variable "postgres_sku_name" {
  description = "SKU name for the PostgreSQL flexible server"
  type        = string
  default     = "B_Standard_B1ms"
}

variable "postgres_storage_mb" {
  description = "Storage size in MB for the flexible server"
  type        = number
  default     = 32768
}

variable "postgres_version" {
  description = "PostgreSQL version"
  type        = string
  default     = "15"
}

variable "postgres_zone" {
  description = "Availability zone for the flexible server"
  type        = string
  default     = "1"
}
variable "allowed_ips" {
  type = map(string)
  description = "Map of IP addresses to allow in firewall rules"
}
