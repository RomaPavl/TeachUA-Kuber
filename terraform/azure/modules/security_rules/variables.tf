variable "resource_group_name" { type = string }
variable "location"            { type = string }

variable "nsg_name" {
  type    = string
  default = "nsg"
}

variable "subnet_ids" {
  description = "Map of subnet names to subnet IDs that need this NSG"
  type        = map(string)
  default     = {}
}

variable "rules" {
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
  default = []
}
