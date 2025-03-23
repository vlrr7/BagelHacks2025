import cohere
import os
from dotenv import load_dotenv
from parseFile import parse_pdf_to_text

load_dotenv()

def ask_cohere(query):

    co = cohere.Client(os.getenv("COHERE_API_KEY"))
    response = co.chat(
        model="command-a-03-2025",
        messages=[{"role": "user", "content": query}],
    )

    return(response)

def rerank_cohere(query, documents):
    try:
        co = cohere.Client(os.environ.get('COHERE_API_KEY'))
        
        # Prepare documents for reranking
        docs = [{"text": doc["text"], "email": doc["email"]} for doc in documents]
        
        # Get reranking results
        results = co.rerank(
            query=query,
            documents=[doc["text"] for doc in docs],
            top_n=len(docs),
            model='rerank-english-v2.0'
        )
        
        # Format results with email and scores
        ranked_results = []
        for result in results:
            ranked_results.append({
                "email": docs[result.index]["email"],
                "text": docs[result.index]["text"],
                "relevance_score": result.relevance_score
            })
            
        return ranked_results

    except Exception as e:
        print(f"Cohere reranking error: {str(e)}")
        return []
