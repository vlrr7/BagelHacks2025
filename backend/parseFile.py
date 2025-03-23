import PyPDF2

def parse_pdf_to_text(file_path):
    with open(file_path, 'rb') as fichier:
        reader = PyPDF2.PdfReader(fichier)
        num_pages = len(reader.pages)
        text = []

        for page in range(num_pages):
            page_text = reader.pages[page].extract_text()
            if page_text:
                text.append(page_text)
            else:
                text.append(f"Page {page + 1} sans texte identifiable.")

    text_complet = '\n'.join(text)
    return text_complet

if __name__ == "__main__":
    file_path='user/pdf/test.pdf'
    text_extrait = parse_pdf_to_text(file_path)
    print(text_extrait)
