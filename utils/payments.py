import random
import string

# def __id_generator__(size=6, chars=string.ascii_uppercase + string.digits + string.ascii_lowercase):
#     return ''.join(random.choice(chars) for _ in range(size))

def random_string_generator(size=15, chars=string.ascii_uppercase + string.digits + string.ascii_lowercase):
    return "".join(random.choice(chars) for _ in range(size))

def unique_order_id_generator(Klass):
    new_order_id = random_string_generator()

    qs_exists = Klass.objects.filter(ORDERID=new_order_id).exists()
    if qs_exists:
        return unique_order_id_generator(Klass)
    return new_order_id
