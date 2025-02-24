document.getElementById('inscricao-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const linguagem = document.getElementById('linguagem').value;

    // Validação do telefone (deve começar com 9 e ter 9 dígitos)
    const telefoneRegex = /^[9][0-9]{8}$/;
    if (!telefone || !telefoneRegex.test(telefone)) {
        alert('Por favor, insira um número de telefone válido começando com 9 e com 9 dígitos (ex.: 936705605).');
        return;
    }

    if (!nome || !email || !linguagem) {
        alert('Por favor, preencha todos os campos (exceto telefone, que já foi validado).');
        return;
    }

    // Gerar o PDF
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
    doc.text(`Telefone: ${telefone}`, 20, 80);
    doc.text(`Linguagem Escolhida: ${linguagem}`, 20, 90);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("Formador: João de Oliveira O. Txipamba", 20, 110);

    doc.setFontSize(12);
    doc.setTextColor(255, 0, 0);
    const ibanText = "IBAN para Pagamento: 0040.0000.7307.3375.1015.4";
    doc.text("Destinatário: João de Oliveira O. Txipamba", 20, 120);
    doc.text(ibanText, 20, 140, { maxWidth: 170 });

    doc.setFillColor(40, 167, 69);
    doc.rect(0, doc.internal.pageSize.getHeight() - 20, pageWidth, 20, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.text("Obrigado por se inscrever!", center, doc.internal.pageSize.getHeight() - 10, { align: "center" });

    // Salvar o PDF temporariamente no cliente e criar um URL blob para compartilhar
    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);

    // Notificação no WhatsApp com link para o PDF
    const mensagemParaVoce = `Nova inscrição!\nNome: ${nome}\nEmail: ${email}\nTelefone: ${telefone}\nLinguagem: ${linguagem}\nBaixe o comprovativo aqui: ${pdfUrl}`;
    const numeroWhatsAppDono = '244936705605';
    const linkWhatsAppDono = `https://wa.me/${numeroWhatsAppDono}?text=${encodeURIComponent(mensagemParaVoce)}`;

    // Abrir o WhatsApp em uma nova aba
    window.open(linkWhatsAppDono, '_blank');

    // Forçar o download do PDF para o inscrito
    doc.save('comprovativo-inscricao.pdf');
    alert('Inscrição realizada com sucesso! Seu comprovativo foi baixado e você será notificado no WhatsApp com o link para o documento.');
    document.getElementById('inscricao-form').reset();

    // Limpar o URL do blob após o uso para evitar memory leaks
    URL.revokeObjectURL(pdfUrl);
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