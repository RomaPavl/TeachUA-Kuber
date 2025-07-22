terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = ">= 3.0.0"
    }
  }
}
provider "azurerm" {
  features {
    resource_group {
      prevent_deletion_if_contains_resources = false
    }
  }
  subscription_id = "be36a038-1e4d-4415-9373-b80102ba23f2"
  tenant_id       = "76dc269e-2891-4689-8149-8746a058fbb8"

}
