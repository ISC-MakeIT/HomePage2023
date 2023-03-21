variable "acm_certificate_set" {
    type = set(any)
}

variable "zone_id" {
    type = string
}

variable "ttl" {
    type = number
}

variable "name" {
    type = string
}

variable "type" {
    type = string
}

variable "record_list" {
    type = set(string)
}
