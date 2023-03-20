resource "aws_vpc" "main" {
  cidr_block = var.cidr

  tags = {
    Name = "${var.namespace}-${var.env}-${var.cidr}"
  }
}
