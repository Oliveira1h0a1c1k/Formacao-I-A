document.getElementById('inscricao-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const linguagem = document.getElementById('linguagem').value;

    if (!nome || !email || !linguagem) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.getWidth();
    const center = pageWidth / 2;

    doc.setFillColor(40, 167, 69);
    doc.rect(0, 0, pageWidth, 30, 'F');
    doc.setFontSize(24);
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.text("Formação Intensiva de Programação com IA", center, 20, { align: "center" });

    doc.setFontSize(18);
    doc.setTextColor(40, 167, 69);
    doc.setFont("helvetica", "normal");
    doc.text("Comprovativo de Inscrição", center, 40, { align: "center" });

    doc.setLineWidth(1);
    doc.setDrawColor(40, 167, 69);
    doc.line(20, 45, pageWidth - 20, 45);

    doc.setFontSize(12);
    doc.setTextColor(50, 50, 50);
    doc.text(`Nome: ${nome}`, 20, 60);
    doc.text(`Email: ${email}`, 20, 70);
    doc.text(`Linguagem Escolhida: ${linguagem}`, 20, 80);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("Formador: João de Oliveira O. Txipamba", 20, 100);

    doc.setFontSize(12);
    doc.setTextColor(255, 0, 0);
    const ibanText = "IBAN para Pagamento: 0040.0000.7307.3375.1015.4";
    doc.text("Destinatário: João de Oliveira O. Txipamba", 20, 100);
    doc.text(ibanText, 20, 120, { maxWidth: 170 });

    doc.setFillColor(40, 167, 69);
    doc.rect(0, doc.internal.pageSize.getHeight() - 20, pageWidth, 20, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.text("Obrigado por se inscrever!", center, doc.internal.pageSize.getHeight() - 10, { align: "center" });

    doc.save('comprovativo-inscricao.pdf');
    alert('Inscrição realizada com sucesso! Seu comprovativo foi baixado.');
    document.getElementById('inscricao-form').reset();
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        document.querySelectorAll('.page-section').forEach(section => {
            section.style.display = 'none';
        });
        document.getElementById(targetId).style.display = 'block';
    });
});

document.getElementById('home').style.display = 'block';