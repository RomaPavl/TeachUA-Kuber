resource "azurerm_public_ip" "pip" {
  for_each = { for k, v in var.vms : k => v if v.public_ip }

  name                = "${each.value.name}-pip"
  resource_group_name = var.resource_group_name
  location            = var.location
  allocation_method   = "Static"
}

resource "azurerm_network_interface" "nic" {
  // Створюємо NIC для усіх машин
  for_each = var.vms

  name                = "${each.value.name}-nic"
  resource_group_name = var.resource_group_name
  location            = var.location

  ip_configuration {
    name                          = "ipcfg"
    subnet_id                     = each.value.subnet_id
    private_ip_address_allocation = "Dynamic"
    public_ip_address_id          = try(azurerm_public_ip.pip[each.key].id, null)
  }
}

resource "azurerm_network_interface_security_group_association" "assoc" {
  for_each = var.vms

  network_interface_id      = azurerm_network_interface.nic[each.key].id
  network_security_group_id = each.value.nsg_id
}

resource "azurerm_linux_virtual_machine" "vm" {
  for_each            = azurerm_network_interface.nic
  name                = each.value.name
  resource_group_name = var.resource_group_name
  location            = var.location
  size                = var.vm_size
  admin_username      = var.admin_username

  network_interface_ids = [
    azurerm_network_interface.nic[each.key].id
  ]

  
  admin_ssh_key {
    username   = var.admin_username
    public_key = var.ssh_public_key
  }
  disable_password_authentication = true

  source_image_reference {
    publisher = var.image.publisher
    offer     = var.image.offer
    sku       = var.image.sku
    version   = var.image.version
  }

  os_disk {
    caching              = var.os_disk.caching
    storage_account_type = var.os_disk.storage_account_type
  }
}
