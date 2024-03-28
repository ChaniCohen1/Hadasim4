
num = int(input("Enter number\n"))
while num != 3:
    height = int(input("Enter the height of the tower\n"))
    width = int(input("Enter the width of the tower\n"))
    if num == 1: #מלבן
        if width == height or height > width + 5:
            print("The area is:", width*height)
        else:
            print("The scope is:", width*2 + height*2)
        
    elif num == 2: #משולש
        choice = int(input("Enter 1 to calculate the perimeter of a triangle.\n Enter 2 to print the triangle."))
        if choice == 1: #חישוב היקף משולש
            x = (width / 2) ** 2 + height ** 2 # חישוב ריבועי הצלעות
            rib = x ** 0.5 #שורש ריבועי של התוצאה
            print("The perimeter of the triangle is:", width + rib*2)
            
        elif choice == 2: #הדפסת משולש
            if width % 2 == 0 or width > height * 2: 
                print("The triangle cannot be printed")
            else:
                #מקרה קצה
                if width == 3:
                    list_tower = [1]*(height-1)
                    list_tower += [width]
                else:
                    print(height,width)
                    num_rows = int((height - 2) / (width//2 - 1))
                    mod = int((height - 2) % (width//2 - 1))
                    print(num_rows,mod)
                    list_tower = [1]
                    num_asterisks = 3
                    while num_asterisks < width:
                        if num_asterisks == 3:
                            list_tower += [num_asterisks] * (num_rows+mod)
                        else:
                            list_tower += [num_asterisks] * num_rows
                        num_asterisks += 2
                    list_tower.append(width)
                    print(list_tower)
                    
                for i in list_tower:
                    print(" " * ( (width - i) // 2 ) ,"*" * i)
        else:
            print("Incorrect input")   
    else:
        print("Incorrect input")
    
    num = int(input("Enter number\n"))
