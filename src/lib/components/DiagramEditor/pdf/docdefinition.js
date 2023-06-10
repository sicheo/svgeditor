


const masterDefinition = (node) => {
    let doc = '$DSDXXXX'
    let prj = '$PROJXXXX'
    let prod = '$PRODXXXX'
    let batch = '$BATCHXXXX'
    let date = '$DATEXXXX'
    let sign = '$SIGNXXXX'
    let sapc = '$SAPZXXXX'
    let sapd = '$SAPMXXXX'

    if (node.data.params) {
        if (node.data.params.doccode)
            doc = node.data.params.doccode
        if (node.data.params.prodcode)
            prod = node.data.params.prodcode
        if (node.data.params.projcode)
            prj = node.data.params.projcode
        if (node.data.params.sapcode)
            sapc = node.data.params.sapcode
        if (node.data.params.sapdesc)
            sapd = node.data.params.sapdesc
    }

    let masterTemplate = {
        pageSize: 'A4',
        header:
        {
            columns: [
                { text: "Codice documento: "+doc, style: 'header', margin: [15, 20, 0, 0] },
                { text: "Lotto: "+batch, style: 'header', aligment: 'center', margin: [0, 20, 10, 0] },
                { text: "PHASE: MASTER", style: 'header', aligment: 'left', margin: [0, 20, 10, 0] }
            ],
        },
        pageBreakBefore: function (currentNode, followingNodesOnPage, nodesOnNextPage, previousNodesOnPage) {
            return currentNode.headlineLevel === 1 && followingNodesOnPage.length === 0;
        },

        footer: function (currentPage, pageCount) { return { text: 'Pag. ' + currentPage.toString() + ' di ' + pageCount, style: 'footer' } },

        content: [
            { text: 'Dipartimento DRUG SUBSTANCE DEVELOPMENT (DSD)', style: 'title', margin: [0, 80, 0, 0] },
            { text: 'BATCH RECORD DI PROCESSO', style: 'title' },
            { text: 'PROGETTO '+prj, style: 'title' },
            { text: 'Fase di Sintesi: Processo di Sintesi fino a Drug Substance', style: 'subtitle', margin: [0, 80, 0, 0] },
            { text: 'Codice di Prodotto: '+prod, style: 'subtitle', margin: [0, 10, 0, 0] },
            { text: 'Codice e descrizione SAP: '+sapc+'-'+sapd, style: 'subtitle', margin: [0, 10, 0, 0] },
            { text: 'Codice Documento: '+doc, style: 'subtitle', margin: [0, 10, 0, 0] },
            { text: 'CCP di produzione n°:                   Lotto: $BATCHXXXX', style: 'subtitle', margin: [0, 80, 0, 0] },
            { text: 'Note:', style: 'subtitle', margin: [0, 20, 0, 0] },
            {
                columns: [
                    { text: 'Data:  '+date, style: 'subtitle', margin: [0, 20, 0, 0] },
                    { text: 'Firma: '+sign, style: 'subtitle', margin: [0, 20, 0, 0] },
                ]
            },
            { qr: doc+' '+prod+' '+batch+' '+date +' '+sign, margin: [0, 20, 0, 0], pageBreak: 'after' },
            { text: 'STORIA DELLE REVISIONI:', style: 'subtitle', margin: [0, 40, 0, 10] },
            {
                table: {
                    headerRows: 1,
                    widths: ['*', '*'],
                    body: [
                        [{ text: 'Elenco delle modifiche effettuate', style: 'table', fillColor: '#f9f9f9' },
                        { text: 'Sostituisce documento', style: 'table', fillColor: '#f9f9f9' }],
                        ['Aggiornamento al template in vigore 3', 'DSDXXXXXXXXX'],
                        ['Aggiornamento numero di paragrafi della suddivisione dei moduli', 'DSDXXXXXXXXX'],
                        ['Typo error: correzione dei punti XXXX', 'DSDXXXXXXXXX']
                    ]
                }
            },
            { text: '1.1 ELENCO BATCH RECORD CONNESSI', style: 'subtitle', margin: [0, 20, 0, 0] },
            { text: 'N.A.', style: 'normal', margin: [10, 12, 0, 0] },
            { text: '1.2 SCOPO', style: 'subtitle', margin: [0, 20, 0, 0] },
            { text: 'Descrivere il metodo per la produzione della drug substance XXXXXXX, a partire da XXXXXXXX e ad XXXXXXX', style: 'normal', margin: [10, 12, 0, 0] },
            { text: '1.3 STORIA DEL PROCESSO', style: 'subtitle', margin: [10, 20, 0, 0] },
            { text: 'Le attività sperimentali relative allo sviluppo e alla definizione del metodo di sintesi svolte sono riportate nel quaderno elettronico XXXXXXXXX', style: 'normal', margin: [10, 12, 0, 0] },
            { text: 'Effettuate successive produzioni c-GMP registrate sui rispettivi documenti di produxzione (Batch Record di produzione)', style: 'normal', margin: [10, 12, 0, 0] },
            { text: '1.4 SCHEMA DI REAZIONE E DESCRIZIONE DEL PROCESSO', style: 'subtitle', margin: [0, 20, 0, 0] },
            { text: 'Si inserisce immagine dello schema di sintesi', style: 'normal', margin: [10, 12, 0, 0] },
            { text: 'Si inserisce testo per la descrizione del processo di sintesi', style: 'normal', margin: [10, 12, 0, 0] },

        ],

        styles: {
            header: {
                fontSize: 8,
                bold: false
            },
            footer: {
                fontSize: 10,
                bold: false,
                alignment: 'center'
            },
            title: {
                fontSize: 14,
                bold: true,
                alignment: 'center',
            },
            subtitle: {
                fontSize: 11,
                bold: true,
                alignment: 'left',
            },
            normal: {
                fontSize: 11,
                bold: false,
                alignment: 'left',
            },
            table: {
                fontSize: 11,
                bold: true,
                alignment: 'center'
            }
        }
    }

    return masterTemplate

}


const  docDefinition = {
    MASTER: masterDefinition
}

export default docDefinition