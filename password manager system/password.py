import random
import string
passwords={}
try:
    with open("passwords.txt","r") as file:
        for line in file:
            website,pwd=line.strip().split(":")
            passwords[website]=pwd
except FileNotFoundError:
    pass

def generate_Password():
    chars=string.ascii_letters+string.digits+"!@#$%&"
    password="".join(random.choice(chars) for _ in range(8))
    return password
while True:
    print('\n--WELCOME TO PASSWORD GENERATOR--')
    print("1.Save password")
    print('2.View password')
    print('3.Check password')
    print("4.Exit")
    choice=int(input("Enter your choice: "))
    if choice==1:
        site=input("Enter website: ")
        pwd=input("Enter password: ")
        passwords[site]=pwd
        with open("passwords.txt","w") as file:
            file.write(f"{site}:{pwd}\n")
        print("Password Saved! ")
    elif choice==2:
        if not passwords:
            print('No data')
        else:
            for site,pwd in passwords.items():
                print(site,":",pwd)
    elif choice==3:
        print("Generated password",generate_Password())
    elif choice==4:
        print("Exit")
        break
    else:
        print("Invalid choice")
