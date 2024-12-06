const url = 'https://eduardo-trabalho-lp-2.vercel.app/fornecedores/';
// const url = 'http://localhost:4000/fornecedores/'

export async function gravar(fornecedor) {
    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fornecedor)
    });
    return await res.json();
}

export async function deletar(fornecedor) {
    const res = await fetch(url, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fornecedor)
    });
    return await res.json();
}

export async function atualizar(fornecedor) {
    const res = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fornecedor)
    });
    return await res.json();
}

export async function consultar() {
    const res = await fetch(url, {
        method: 'GET',
    });
    return await res.json();
}
