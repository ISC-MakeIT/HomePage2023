locals {
  egress_list  = tolist(var.egress_map)
  ingress_list = tolist(var.ingress_map)
}

resource "aws_security_group" "main" {
  name        = "${var.namespace}-${var.env}-security-group"
  description = "${var.namespace} security group"
  vpc_id      = var.vpc_id

  dynamic "egress" {
    for_each = local.egress_list

    content {
        from_port   = egress.value.from_port
        to_port     = egress.value.to_port
        protocol    = egress.value.protocol
        cidr_blocks = egress.value.cidr_blocks
    }
  }

  dynamic "ingress" {
    for_each = local.ingress_list

    content {
        from_port   = ingress.value.from_port
        to_port     = ingress.value.to_port
        protocol    = ingress.value.protocol
        cidr_blocks = ingress.value.cidr_blocks
    }
  }


  tags = {
    Name = "${var.namespace}-security-group"
  }
}
