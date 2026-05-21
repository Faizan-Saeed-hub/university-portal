

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./UOSPrograms.css";

export default function UOSPrograms() {
  const { id } = useParams();
  const [university, setUniversity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDept, setSelectedDept] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUniversity = async () => {
      try {
        const res = await axios.get(`https://university-admission-support-system.up.railway.app/api/admin/universities/${id}`);
        setUniversity(res.data);
      } catch (err) {
        console.error("Failed to fetch university programs", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchUniversity();
  }, [id]);

  if (loading) {
    return (
      <div className="uos-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <div style={{ color: 'var(--text-secondary)', fontSize: '18px' }}>Loading University Programs...</div>
      </div>
    );
  }

  if (!university) {
    return (
      <div className="uos-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <div style={{ color: 'var(--accent-red)', fontSize: '18px' }}>University not found!</div>
      </div>
    );
  }

  const departments = university.departments || [];

  const filteredDepartments =
    departments.filter((dept) =>
      dept.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  return (
    <div className="uos-page">

      {/* HERO */}

      <div className="hero">
        <h1>
          {university.name}
        </h1>

        <p>
          Programs, Eligibility &
          Fee Structure
        </p>
      </div>

      {/* SEARCH */}

      <div className="search-box">
        <input
          type="text"
          placeholder="Search Department..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />
      </div>

      {/* GRID */}

      <div className="department-grid">

        {filteredDepartments.map(
          (dept, index) => (

            <div
              className="department-card"
              key={index}
            >

              <h2>{dept.name}</h2>

              <p>
                Programs:{" "}
                {
                  (dept.programs || []).length
                }
              </p>

              <div className="fee-box">
                Fee: {dept.fee || (university.averageFee ? `${university.averageFee.toLocaleString()} / Semester` : "Fee N/A")}
              </div>

              <button
                onClick={() =>
                  setSelectedDept(
                    dept
                  )
                }
              >
                View Programs
              </button>
            </div>
          )
        )}
      </div>

      {/* MODAL */}

      {selectedDept && (
        <div className="modal-overlay">

          <div className="modal">

            <button
              className="close-btn"
              onClick={() =>
                setSelectedDept(null)
              }
            >
              ×
            </button>

            <h2>
              {selectedDept.name}
            </h2>

            {(selectedDept.programs || []).length > 0 ? (
              selectedDept.programs.map((program, index) => (
                <div
                  key={index}
                  className="program-card"
                >

                  <h3>
                    {program.title}
                  </h3>

                  <p>
                    <strong>
                      Duration:
                    </strong>{" "}
                    {
                      program.duration
                    }
                  </p>

                  <p>
                    <strong>
                      Eligibility:
                    </strong>{" "}
                    {
                      program.eligibility
                    }
                  </p>

                  <p>
                    <strong>
                      Required Degree:
                    </strong>{" "}
                    {
                      program.requiredDegree
                    }
                  </p>

                </div>
              ))
            ) : (
              <p style={{ padding: "20px 0", color: "var(--text-muted)", fontSize: "14px" }}>
                No detailed program listings added for this department yet.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}