resource "aws_subnet" "subnet" {
  count = length(var.subnet_parameter_list)

  vpc_id            = var.vpc_id
  cidr_block        = tolist(var.subnet_parameter_list)[count.index].cidr_block
  availability_zone = tolist(var.subnet_parameter_list)[count.index].availability_zone

  tags = {
    Name = "${var.namespace}-${var.env}-${tolist(var.subnet_parameter_list)[count.index].cidr_block}"
  }
}
