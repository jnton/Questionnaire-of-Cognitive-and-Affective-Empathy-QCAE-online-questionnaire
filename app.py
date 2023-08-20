# Import the necessary modules
import webbrowser
import json

# Define the questionnaire items and response options
QCAE_items = [
    "I sometimes find it difficult to see things from the “other guy’s” point of view.",
    "I am usually objective when I watch a film or play, and I don’t often get completely caught up in it.",
    "I try to look at everybody’s side of a disagreement before I make a decision.",
    "I sometimes try to understand my friends better by imagining how things look from their perspective.",
    "When I am upset at someone, I usually try to “put myself in his shoes” for a while.",
    "Before criticizing somebody, I try to imagine how I would feel if I was in their place.",
    "I often get emotionally involved with my friends’ problems.",
    "I am inclined to get nervous when others around me seem to be nervous.",
    "People I am with have a strong influence on my mood.",
    "It affects me very much when one of my friends seems upset.",
    "I often get deeply involved with the feelings of a character in a film, play, or novel.",
    "I get very upset when I see someone cry.",
    "I am happy when I am with a cheerful group and sad when the others are glum.",
    "It worries me when others are worrying and panicky.",
    "I can easily tell if someone else wants to enter a conversation.",
    "I can pick up quickly if someone says one thing but means another",
    "It is hard for me to see why some things upset people so much.",
    "I find it easy to put myself in somebody else’s shoes.",
    "I am good at predicting how someone will feel.",
    "I am quick to spot when someone in a group is feeling awkward or uncomfortable.",
    "Other people tell me I am good at understanding how they are feeling and what they are thinking.",
    "I can easily tell if someone else is interested or bored with what I am saying",
    "Friends talk to me about their problems as they say that I am very understanding.",
    "I can sense if I am intruding, even if the other person does not tell me.",
    "I can easily work out what another person might want to talk about.",
    "I can tell if someone is masking their true emotion.",
    "I am good at predicting what someone will do.",
    "I can usually appreciate the other person’s viewpoint, even if I do not agree with it.",
    "I usually stay emotionally detached when watching a film.",
    "I always try to consider the other fellow’s feelings before I do something.",
    "Before I do something I try to consider how my friends will react to it."
]

QCAE_options = [
    "Strongly agree",
    "Slightly agree",
    "Slightly disagree",
    "Strongly disagree"
]

# Define the scoring scheme for each item
QCAE_scoring = {
    1: [4, 3, 2, 1], # Reverse scored
    2: [4, 3, 2, 1], # Reverse scored
    3: [1, 2, 3, 4],
    4: [1, 2, 3, 4],
    5: [1, 2, 3, 4],
    6: [1, 2, 3, 4],
    7: [1, 2, 3, 4],
    8: [1, 2, 3, 4],
    9: [1, 2, 3, 4],
   10: [1, 2, 3, 4],
   11: [1, 2, 3, 4],
   12: [1, 2, 3, 4],
   13: [1, 2, 3, 4],
   14: [1, 2, 3, 4],
   15: [1, 2, 3, 4],
   16: [1, 2, 3 ,4],
   17: [4 ,3 ,2 ,1], # Reverse scored
   18: [1 ,2 ,3 ,4],
   19: [1 ,2 ,3 ,4],
   20: [1 ,2 ,3 ,4],
   21: [1 ,2 ,3 ,4],
   22: [1 ,2 ,3 ,4],
   23: [1 ,2 ,3 ,4],
   24: [1 ,2 ,3 ,4],
   25: [1 ,2 ,3 ,4],
   26: [1 ,2 ,3 ,4],
   27: [1 ,2 ,3 ,4],
   28: [1 ,2 ,3 ,4],
   29: [4 ,3 ,2 ,1], # Reverse scored
   30: [1 ,2 ,3 ,4],
   31: [1 ,2 ,3 ,4]
}

# Define the subscales and their corresponding items
QCAE_subscales = {
    "Perspective Taking": [15, 16, 19, 20, 21, 22, 24, 25, 26, 27],
    "Online Simulation": [1, 3, 4, 5, 6, 18, 28, 30, 31],
    "Emotion Contagion": [8, 9, 13, 14],
    "Proximal Responsivity": [7, 10, 12, 23],
    "Peripheral Responsivity": [2, 11, 17, 29]
}

# Define a function to calculate the subscale and total scores
def QCAE_score(responses):
    # Check if the responses are valid
    if len(responses) != len(QCAE_items):
        print("Invalid number of responses")
        return None
    for r in responses:
        if r not in QCAE_options:
            print("Invalid response option")
            return None
    
    # Initialize the scores dictionary
    scores = {}
    for s in QCAE_subscales:
        scores[s] = 0
    
    # Loop through the items and add the scores to the corresponding subscales
    for i in range(len(responses)):
        item = i + 1
        response = responses[i]
        option = QCAE_options.index(response) + 1
        score = QCAE_scoring[item][option - 1]
        for s in QCAE_subscales:
            if item in QCAE_subscales[s]:
                scores[s] += score
    
    # Calculate the total scores for cognitive and affective empathy
    scores["Cognitive Empathy"] = scores["Perspective Taking"] + scores["Online Simulation"]
    scores["Affective Empathy"] = scores["Emotion Contagion"] + scores["Proximal Responsivity"] + scores["Peripheral Responsivity"]
    
    # Return the scores dictionary
    return scores

# Define a function to display the questionnaire and collect the responses
def QCAE_display():
    # Open a new web page with the questionnaire title and instructions
    webbrowser.open_new("QCAE: A Questionnaire of Cognitive and Affective Empathy")
    print("Welcome to the QCAE: A Questionnaire of Cognitive and Affective Empathy")
    print("This questionnaire is designed to measure your ability to understand and share the emotions of others.")
    print("Please read each statement carefully and indicate how much you agree or disagree with it.")
    print("There are no right or wrong answers, just answer as honestly as you can.")
    
    # Initialize an empty list to store the responses
    responses = []
    
    # Loop through the items and display them with the response options
    for i in range(len(QCAE_items)):
        item = i + 1
        statement = QCAE_items[i]
        print(f"Item {item}: {statement}")
        print("Response options:")
        for j in range(len(QCAE_options)):
            option = j + 1
            label = QCAE_options[j]
            print(f"{option}: {label}")
        
        # Ask the user to enter a response and validate it
        valid = False
        while not valid:
            response = input("Please enter your response (1-4): ")
            if response.isdigit() and int(response) in range(1,5):
                valid = True
                responses.append(QCAE_options[int(response) - 1])
            else:
                print("Invalid input. Please enter a number between 1 and 4.")
    
    # Calculate and display the scores using the scoring function
    scores = QCAE_score(responses)
    if scores is not None:
        print("Thank you for completing the questionnaire. Here are your scores:")
        for s in scores:
            print(f"{s}: {scores[s]}")
