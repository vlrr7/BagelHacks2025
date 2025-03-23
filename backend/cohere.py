from cohere import Client, ClientV2
from parseFile import parse_pdf_to_text
import os

def ask_cohere(query):

    co = ClientV2(os.getenv("COHERE_API_KEY"))
    response = co.chat(
        model="command-a-03-2025",
        messages=[{"role": "user", "content": query}],
    )

    return(response)

# query: str, documents: List[str]


def rerank_cohere(query, user_cvs, top_n=3):
    for user_cv in user_cvs:
        user_cv["cv_pdf"] = parse_pdf_to_text(user_cv["cv_pdf"])
    
    client = Client(
        client_name="YOUR_CLIENT_NAME",  # ou tu peux le retirer
        token=os.getenv("COHERE_API_KEY")
    )

    response = client.rerank(  # ou client.v2.rerank selon la version
        model="rerank-v3.5",
        query=query,
        documents=user_cvs["cv_pdf"],
        top_n=top_n
    )

    relevant_results = []
    for result in response.results:
        if result.relevance_score > 0.5:
            user_cvs[result["index"]]["relevance_score"] = result.relevance_score
            relevant_results.append({user_cvs[result["index"]]})
    
    #Keep only 10 results
    return relevant_results[:10]
    
    # Tu peux retourner les documents reclassés
    #return [result.document['text'] for result in response.results]
