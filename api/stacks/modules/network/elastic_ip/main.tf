resource "aws_eip" "nat_1a" {
  vpc = true

  tags = {
    Name = "${var.namespace}-${var.env}-natgw-1a"
  }
}
