const url = 'https://eduardo-lp-2-projeto.vercel.app/usuarios/';
// const url = 'http://localhost:4000/usuarios/'

export async function gravar(usuario) {
    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario)
    });
    return await res.json();
}

export async function deletar(usuario) {
    const res = await fetch(url + usuario.email, {
        method: 'DELETE'
    });
    return await res.json();
}

export async function atualizar(usuario) {
    const res = await fetch(url + usuario.email, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario)
    });
    return await res.json();
}

export async function consultar() {
    const res = await fetch(url, {
        method: 'GET',
    });
    return await res.json();
}
