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
    return response

def rerank_cohere(query, documents):
    try:
        co = cohere.Client(os.getenv('COHERE_API_KEY'))
        
        # Convert binary PDF content to text for each document
        docs_with_text = []
        print(f"Processing {len(documents)} documents")
        
        for doc in documents:
            if 'cv_pdf' in doc:
                print(f"Processing CV for email: {doc.get('email', 'unknown')}")
                # Get binary data directly from the Binary object
                binary_data = doc['cv_pdf']
                text = parse_pdf_to_text(binary_data)
                
                # Clean text by removing null bytes and normalizing whitespace
                if text:
                    cleaned_text = text.replace('\x00', '').strip()
                    cleaned_text = ' '.join(cleaned_text.split())
                    print(f"Extracted text length: {len(cleaned_text)} chars")
                    
                    if cleaned_text:  # Only add if we have valid text
                        docs_with_text.append({
                            'email': doc['email'],
                            'text': cleaned_text
                        })
                    else:
                        print(f"Skipping document - empty text after cleaning")
                else:
                    print(f"Skipping document - no text extracted")
        
        if not docs_with_text:
            print("No valid documents to process")
            return []
            
        print(f"Sending {len(docs_with_text)} documents to Cohere for ranking")
        # Get reranking results
        response = co.rerank(
            model="rerank-v3.5",
            query=query,
            documents=[doc['text'] for doc in docs_with_text],
            top_n=len(docs_with_text)
        )
        
        print(f"Received {len(response.results)} ranked results")
        # Format results with email and scores
        ranked_results = []
        for result in response.results:
            ranked_results.append({
                "email": docs_with_text[result.index]['email'],
                "text": docs_with_text[result.index]['text'],
                "relevance_score": result.relevance_score
            })
            
        return ranked_results

    except Exception as e:
        print(f"Cohere reranking error: {str(e)}")
        print(f"Error type: {type(e)}")
        import traceback
        print(f"Stack trace: {traceback.format_exc()}")
        return []
