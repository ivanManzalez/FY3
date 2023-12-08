class MissingFieldError(Exception):
  pass

def check_all_field(data):
  fields = [
    data.get('username'),
    data.get('password'),
    data.get('email'),
    data.get('first_name'),
    data.get('last_name'),
    
  ]

  for field in fields:
    print(field)
    if field == "" or field == None:
      raise MissingFieldError("1 or more Missing fields: username, password, email, first_name, or last_name")
  
  return fields
  