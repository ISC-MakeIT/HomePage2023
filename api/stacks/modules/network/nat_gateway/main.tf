resource "aws_nat_gateway" "nat_1a" {
  subnet_id     = var.subnet_id
  allocation_id = var.allocation_id

  tags = {
    Name = "${var.namespace}-${var.env}-1a"
  }
}
