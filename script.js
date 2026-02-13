function calculateSubnets() {
    const ipValue = document.getElementById('ipInput').value.trim();
    const subnetsValue = document.getElementById('subnetsInput').value;
    
    if (!ipValue || !subnetsValue) {
        alert("Por favor, completa ambos campos.");
        return;
    }

    let n = Math.ceil(Math.log2(subnetsValue));
    let salto = Math.pow(2, 8 - n);
    let mascDec = 0;
    let bits = [128, 64, 32, 16, 8, 4, 2, 1];
    for(let i = 0; i < n; i++) mascDec += bits[i];

    let htmlTab = `<h3>CUADRO:</h3><div class="scroll-container"><table>
        <tr style="background:#eee"><th>subred</th><th>primer ip</th><th>ultima ip</th><th>broadcast</th></tr>`;

    let parts = ipValue.split('.');
    let base = `${parts[0]}.${parts[1]}.${parts[2]}`;
    let current = 0;

    for (let i = 0; i < subnetsValue; i++) {
        if (current > 255) break;
        htmlTab += `<tr>
            <td>${base}.${current}</td>
            <td>${base}.${current + 1}</td>
            <td>${base}.${current + salto - 2}</td>
            <td>${base}.${current + salto - 1}</td>
        </tr>`;
        current += salto;
    }
    htmlTab += `</table></div>`;

    let htmlExp = `<div class="card-proc">
        <h3>FORMULAS:</h3>
        <p>1. 2<sup>n</sup> &ge; ${subnetsValue} &rarr; n = <b>${n} bits</b></p>
        <p>2. Máscara: 255.255.255.<b>${mascDec}</b> (/${24+n})</p>
        <p>3. Salto: 256 - ${mascDec} = <b>${salto}</b></p>
    </div>`;

    document.getElementById('results').innerHTML = htmlTab;
    document.getElementById('procedimiento').innerHTML = htmlExp;
}