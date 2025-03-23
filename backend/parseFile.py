import PyPDF2
import io

def parse_pdf_to_text(binary_data):
    try:
        # Create a binary stream from the data
        pdf_stream = io.BytesIO(binary_data)
        
        # Create PDF reader object
        reader = PyPDF2.PdfReader(pdf_stream)
        text = []

        # Extract text from each page
        for page in reader.pages:
            page_text = page.extract_text()
            if page_text:
                text.append(page_text)

        # Join all text together
        text_complete = '\n'.join(text)
        return text_complete
    except Exception as e:
        print(f"PDF parsing error: {str(e)}")
        return None
