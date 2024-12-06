const url = 'https://eduardo-trabalho-lp-2.vercel.app/usuarios/';
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
    const res = await fetch(url, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario)
    });
    return await res.json();
}

export async function atualizar(usuario) {
    const res = await fetch(url, {
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

export async function login(nomeUsuario, senhaUsuario) {
    const res = await fetch(url + "login", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            nome: nomeUsuario,
            senha: senhaUsuario
        })
    });
    return await res.json();
}
