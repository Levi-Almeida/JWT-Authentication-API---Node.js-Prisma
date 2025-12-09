import React from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const Busca = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();

    const search = searchParams.get("search") || "";

    const handleSubmit = (e) => {
        e.preventDefault();
        const termo = e.target.search.value;
        setSearchParams({ search: termo });
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            const res = await axios.get(
                `http://localhost:3000/usuarios?search=${search}`
            );

            setUsuarios(res.data.resultados);
            setLoading(false);
        };

        fetchData();
    }, [search]);

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Pesquisar Usuários</h2>

                <form method="GET" onSubmit={handleSubmit} style={styles.form}>
                    <input
                        type="text"
                        name="search"
                        placeholder="Digite nome ou email..."
                        defaultValue={search}
                        style={styles.input}
                    />
                    <button type="submit" style={styles.button}>
                        Buscar
                    </button>
                </form>

                <p style={styles.subtitle}>
                    Termo buscado: <strong>{search || "— mostrando todos —"}</strong>
                </p>

                {loading ? (
                    <p style={styles.loading}>Carregando...</p>
                ) : usuarios.length === 0 ? (
                    <p style={styles.empty}>Nenhum usuário encontrado.</p>
                ) : (
                    <ul style={styles.list}>
                        {usuarios.map((u) => (
                            <li key={u.id} style={styles.listItem}>
                                <div>
                                    <div style={styles.campos}>
                                        <strong>Nome: </strong>
                                        <p>{u.name}</p>

                                    </div>
                                    <div style={styles.campos}>
                                        <strong>Email: </strong>
                                        <p>{u.email}</p>

                                    </div>
                                    <div style={styles.campos}>
                                        <strong>Senha: </strong>
                                        <p >{u.password}</p>

                                    </div>


                                    
                                </div>
                                <span style={styles.role}>{u.role}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

const styles = {

    campos: {
        display: "flex",
        gap: "5px",
    },

    container: {
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        paddingTop: "40px",
        background: "#f3f4f6",
    },
    card: {
        width: "90%",
        background: "#ffffff",
        padding: "25px",
        borderRadius: "12px",
        boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
    },
    title: {
        textAlign: "center",
        marginBottom: "20px",
        fontSize: "24px",
        fontWeight: "bold",
    },
    form: {
        display: "flex",
        gap: "10px",
        marginBottom: "15px",
    },
    input: {
        flex: 1,
        padding: "10px",
        fontSize: "16px",
        borderRadius: "8px",
        border: "1px solid #ccc",
    },
    button: {
        background: "#2563eb",
        color: "#fff",
        border: "none",
        padding: "10px 15px",
        fontSize: "16px",
        borderRadius: "8px",
        cursor: "pointer",
    },
    subtitle: {
        fontSize: "14px",
        marginBottom: "15px",
        color: "#444",
    },
    loading: {
        textAlign: "center",
        marginTop: "20px",
    },
    empty: {
        textAlign: "center",
        marginTop: "20px",
        fontWeight: "bold",
        color: "#555",
    },
    list: {
        listStyle: "none",
        padding: 0,
        marginTop: "10px",
    },
    listItem: {
        padding: "12px 15px",
        background: "#f9fafb",
        borderRadius: "8px",
        marginBottom: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        border: "1px solid #e5e7eb",
    },
    email: {
        margin: 0,
        fontSize: "14px",
        color: "#666",
    },
    role: {
        background: "#2563eb",
        color: "#fff",
        padding: "5px 10px",
        borderRadius: "6px",
        fontSize: "13px",
        textTransform: "uppercase",
    },
};

export default Busca;
