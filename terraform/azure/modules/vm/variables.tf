variable "resource_group_name"        { type = string }
variable "location"                   { type = string }
variable "admin_username"             { type = string }
variable "ssh_public_key"             { type = string }
variable "vm_size"                    { type = string }

variable "vms" {
  description = "Map VM: key – conditional name, value – object with parameters"
  type = map(object({
    name      = string
    subnet_id = string
    nsg_id    = string
    public_ip = bool
  }))
}

variable "image" {
  type = object({
    publisher = string
    offer     = string
    sku       = string
    version   = string
  })
  default = {
    publisher = "Canonical"
    offer     = "0001-com-ubuntu-server-jammy"
    sku       = "22_04-lts"
    version   = "latest"
  }
}

variable "os_disk" {
  description = "Налаштування диска ОС"
  type = object({
    caching              = string
    storage_account_type = string
  })
  default = {
    caching              = "ReadWrite"
    storage_account_type = "Standard_LRS"
  }
}