import random
import time
while True:
    print("\nHi!")
    time.sleep(1)
    print("Welcome to the Movie Emoji Quiz 🎥")
    time.sleep(1)
    print("You will be given 2 emojis and will have to guess the movie.")
    time.sleep(1)
    print("You have 3 attempts to guess correctly. Good luck!")
    time.sleep(1)
    print("Choose a category: Kids movies, Teens movies, or Adult movies")

    answer = input("Enter your choice: ").strip().lower()

    if answer == "kids movies":
        print("You chose Kids movies 🎬")
        movie_list = [
            (("🐭", "🧀"), "Ratatouille"),
            (("🦁", "👑"), "The Lion King"),
            (("🧚", "✨"), "Tinker Bell"),
            (("🐠", "🌊"), "Finding Nemo"),
            (("🧞‍♂️", "🕌"), "Aladdin"),
            (("❄️", "👭"), "Frozen"),
            (("🐉", "👦"), "How to Train Your Dragon"),
            (("🚗", "🏁"), "Cars"),
            (("🧸", "🚀"), "Toy Story"),
            (("🌮", "🎸"), "Coco"),
        ]

    elif answer == "teens movies":
        print("You chose Teens movies 🎒")
        movie_list = [
            (("🧛‍♂️", "💔"), "Twilight"),
            (("🏹", "🔥"), "The Hunger Games"),
            (("🎤", "🎶"), "Pitch Perfect"),
            (("📓", "💑"), "The Notebook"),
            (("🎭", "🏫"), "High School Musical"),
            (("💃", "🕺"), "Step Up"),
            (("🛹", "👊"), "Scott Pilgrim vs. the World"),
            (("🎮", "👾"), "Ready Player One"),
        ]

    elif answer == "adult movies":
        print("You chose Adult movies 🍿")
        movie_list = [
            (("🕵️‍♂️", "🎞️"), "Inception"),
            (("🤯", "🧠"), "Interstellar"),
            (("🔪", "🚿"), "Psycho"),
            (("💊", "🔫"), "The Matrix"),
            (("👨‍⚖️", "📜"), "A Few Good Men"),
            (("🕶️", "🧥"), "John Wick"),
            (("🕵️", "🧩"), "Se7en"),
        ]

    else:
        print("❌ Invalid category. Restarting...\n")
        continue

    # Choose a movie
    chosen_pair, correct_answer = random.choice(movie_list)
    wrong_answers = random.sample(
        [title for _, title in movie_list if title != correct_answer],
        3
    )
    all_options = wrong_answers + [correct_answer]
    random.shuffle(all_options)

    # Show quiz
    print(f"\nGuess the movie: {chosen_pair[0]} {chosen_pair[1]}")
    for i, option in enumerate(all_options, 1):
        print(f"{i}. {option}")

    # Attempt loop
    attempts = 2
    print("You have 2 attempts to guess correctly. Good luck!")

    while attempts > 0:
        try:
            guess = int(input("Enter the number of your guess: "))
            if all_options[guess - 1] == correct_answer:
                print("✅ Correct! Restarting game...\n")
                break
            else:
                attempts -= 1
                if attempts > 0:
                    print(f"❌ Wrong! {attempts} attempt(s) left.")
                else:
                    print(f"❌ Out of tries. The correct answer was: {correct_answer}")
                    print("Restarting game...\n")
        except:
            print("⚠️ Please enter a valid number from 1 to 4.")
    # loop automatically restarts here
