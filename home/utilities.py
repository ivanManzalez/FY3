
def remove_duplicate_teams(queryset):
    new_list = []
    for team in queryset:
      if team not in new_list:
        new_list.append(team)
    return new_list


# from https://realpython.com/sorting-algorithms-python/
def bubble_sort_by_wins(array):
    n = len(array)

    for i in range(n):
        already_sorted = True

        print(array[i])
        for j in range(n - i - 1):

            if (array[j].get_team_wins < array[j + 1].get_team_wins):
                print("compare wins:", array[j], array[j].get_team_wins, '&', array[j+1], array[j+1].get_team_wins)
                array[j], array[j + 1] = array[j + 1], array[j]
                already_sorted = False
            
            elif (array[j].get_team_wins == array[j + 1].get_team_wins):
                if (array[j].get_team_losses > array[j + 1].get_team_losses):
                  print("compare losses:", array[j], array[j].get_team_wins, '&', array[j+1], array[j+1].get_team_wins)
                  array[j], array[j + 1] = array[j + 1], array[j]
        if already_sorted:
            print(i,j,'already_sorted')
            break

    return array