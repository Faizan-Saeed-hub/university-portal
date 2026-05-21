import { useEffect, useState } from "react";
import axios from "axios";
import "./Universitylist.css";
import uopLogo from "../pic/uop.jpeg";
import uosLogo from "../pic/uos.jpeg";
import gcufLogo from "../pic/gcuf.jpeg";
import uolLogo from "../pic/uol.jpeg";

const getUniImage = (logo) => {
    switch (logo) {
        case "uop": return uopLogo;
        case "uos": return uosLogo;
        case "gcuf": return gcufLogo;
        case "uol": return uolLogo;
        default: return "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600&auto=format&fit=crop"; // fallback premium placeholder
    }
};

function Universities() {
    const [universities, setUniversities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUnis = async () => {
            try {
                const res = await axios.get("https://university-admission-support-system.up.railway.app/api/admin/universities");
                setUniversities(res.data);
            } catch (err) {
                console.error("Failed to fetch universities", err);
            } finally {
                setLoading(false);
            }
        };
        fetchUnis();
    }, []);

    if (loading) {
        return (
            <div className="university-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                <div style={{ color: 'var(--text-secondary)', fontSize: '18px' }}>Loading Universities...</div>
            </div>
        );
    }

    return (
        <div className="university-container">
            <h2>Universities</h2>

            <div className="card-grid">
                {universities.map((uni) => (
                    <div className="card" key={uni._id}>
                        <img src={getUniImage(uni.logo)} alt={uni.name} />
                        <div className="card-body">
                            <h3>{uni.name}</h3>
                            <p>{uni.city || "Pakistan"}</p>
                            <div className="button-group">

                                <button
                                    onClick={() =>
                                        window.open(uni.website || "https://google.com", "_blank")
                                    }
                                >
                                    Official Website
                                </button>

                                <button
                                    className="program-btn"
                                    onClick={() =>
                                        window.location.href =
                                        `/university/${uni._id}/programs`
                                    }
                                >
                                    more information
                                </button>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Universities;