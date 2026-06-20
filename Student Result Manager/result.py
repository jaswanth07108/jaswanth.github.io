student={}
while True:
    print("--WELCOME TO STUDENT MANAGER APP--")
    print("1.Add student")
    print("2.View student")
    print("3.Check Result")
    print("4.Exit")

    choice=int(input("Enter your choice"))
    if choice==1:
        name=input("Enter your name: ")
        grade=input("Enter your Grade: ")
        student[name]=grade
        print(f" {name}:{grade} added successfully")
    elif choice==2:
        if not student:
            print("no student")
        else:
            for name,grades in student.items():
                print(f"{name}:{grades}")
    elif choice==3:
        name=input('Enter name to check the student result')
        if name in student:
            grade=student[name]
            if grade>="E":
                print(f"{name}:{grade} grade is higher than E")
                print("Pass")
            else:
                print("Fail")
        else:
            print("No Students Found")
    elif choice==4:
        print("Exiting the program")
        break
    else:
        print("Invalid Choice")
