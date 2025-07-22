variable "resource_group_name" { type = string }
variable "location"            { type = string }

variable "vnet_name" {
  type    = string
  default = "vnet"
}
variable "address_space" {
  type    = list(string)
  default = ["10.0.0.0/16"]
}

variable "subnets" {
  type = list(object({
    name            = string
    address_prefix  = string
  }))
  default = [
    { name = "default", address_prefix = "10.0.1.0/24" },
    { name = "postgres-subnet", address_prefix = "10.0.2.0/24" }
  ]
}
