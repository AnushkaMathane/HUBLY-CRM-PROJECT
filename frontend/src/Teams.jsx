import { useState } from "react";
import { Icon } from "@iconify/react";
import "./Teams.css";

import avatar1 from "/images/Three.png";
import avatar2 from "/images/Four.png";
import avatar3 from "/images/Five.png";
import avatar4 from "/images/Six.png";

const initialTeam = [
  {
    id: 1,
    name: "Joe Doe",
    phone: "+1 (000) 000-0000",
    email: "example@gmail.com",
    role: "Admin",
    avatar: avatar1,
  },
  {
    id: 2,
    name: "Joe Doe",
    phone: "+1 (000) 000-0000",
    email: "example@gmail.com",
    role: "Member",
    avatar: avatar2,
  },
  {
    id: 3,
    name: "Joe Doe",
    phone: "+1 (000) 000-0000",
    email: "example@gmail.com",
    role: "Member",
    avatar: avatar3,
  },
  {
    id: 4,
    name: "Joe Doe",
    phone: "+1 (000) 000-0000",
    email: "example@gmail.com",
    role: "Member",
    avatar: avatar4,
  },
];

const LOGGED_IN_ROLE = "Admin";

export default function Teams() {
  const [team, setTeam] = useState(initialTeam);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [deleteId, setDeleteId] = useState(null);
  const [editData, setEditData] = useState(null);

  const [sortAsc, setSortAsc] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Member",
  });

  /* SORT BY NAME ------------------------------------------------ */
  const sortByName = () => {
    const sorted = [...team].sort((a, b) => {
      const n1 = a.name.toLowerCase();
      const n2 = b.name.toLowerCase();
      return sortAsc ? n1.localeCompare(n2) : n2.localeCompare(n1);
    });

    setTeam(sorted);
    setSortAsc(!sortAsc);
  };

  /* DELETE ------------------------------------------------------- */
  const handleDelete = () => {
    setTeam(team.filter((t) => t.id !== deleteId));
    setShowDeleteModal(false);
  };

  /* ADD MEMBER --------------------------------------------------- */
  const handleSave = () => {
    const newMember = {
      id: Date.now(),
      name: form.name,
      email: form.email,
      phone: "+1 (000) 000-0000",
      role: form.role,
      avatar: avatar1,
    };

    setTeam([...team, newMember]);
    setShowAddModal(false);
    setForm({ name: "", email: "", role: "Member" });
  };

  /* EDIT MEMBER -------------------------------------------------- */
  const openEditModal = (member) => {
    setEditData(member);
    setShowEditModal(true);
  };

  const handleEditSave = () => {
    setTeam(team.map((m) => (m.id === editData.id ? editData : m)));
    setShowEditModal(false);
  };

  /* -------------------------------------------------------------- */

  return (
    <div className="team-page">
      <div className="team-content">
        <h1 className="team-title">Team</h1>

        <div className="team-table-wrapper">
          <table className="team-table">
            <thead>
              <tr>
                <th onClick={sortByName} className="sortable">
                  Full Name
                  <Icon
                    icon="mdi:chevron-down"
                    className={`sort-icon ${sortAsc ? "" : "rotate"}`}
                  />
                </th>

                <th>Phone</th>
                <th>Email</th>
                <th>role</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {team.map((member) => (
                <tr key={member.id}>
                  <td>
                    <div className="team-user">
                      <img src={member.avatar} alt="" />
                      {member.name}
                    </div>
                  </td>

                  <td>{member.phone}</td>
                  <td>{member.email}</td>

                  <td>
                    <span className="role-badge">{member.role}</span>
                  </td>

                  <td>
                    <div className="action-icons">
                      {LOGGED_IN_ROLE === "Admin" && (
                        <>
                          <Icon
                            icon="ri:edit-line"
                            className="icon-btn"
                            onClick={(e) => {
                              e.stopPropagation(); // ⛔ Prevent routing
                              openEditModal(member); // ✔ Open edit modal
                            }}
                          />

                          {/* DELETE BUTTON */}
                          <Icon
                            icon="mdi:delete-outline"
                            className="icon-btn"
                            onClick={() => {
                              setDeleteId(member.id);
                              setShowDeleteModal(true);
                            }}
                          />
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ADD BUTTON */}
        {LOGGED_IN_ROLE === "Admin" && (
          <div className="add-btn-wrapper">
            <button className="add-btn" onClick={() => setShowAddModal(true)}>
              <Icon icon="lucide:circle-plus" width={20} />
              Add Team members
            </button>
          </div>
        )}
      </div>

      {/* ---------------- DELETE MODAL ---------------- */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="delete-modal">
            <div className="delete-text">This teammate will be deleted.</div>

            <div className="delete-actions">
              <button
                className="btn-light"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button className="btn-blue" onClick={handleDelete}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- ADD MODAL ---------------- */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="add-modal">
            <h2 className="add-title">Add Team members</h2>
            <p className="add-desc">
              Talk with colleagues in a group chat. Messages are visible only to
              participants.
            </p>

            <div className="form-group">
              <label>User name</label>
              <input
                className="form-input"
                placeholder="User name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Email ID</label>
              <input
                className="form-input"
                placeholder="Email ID"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Designation</label>

              <div className="dropdown-wrapper">
                <select
                  className="dropdown-select"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                >
                  <option>Member</option>
                  <option>Admin</option>
                </select>

                <Icon icon="lucide:chevrons-up-down" className="select-arrow" />
              </div>
            </div>

            <div className="add-actions">
              <button
                className="btn-light"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>

              <button className="btn-blue" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- EDIT MODAL ---------------- */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="add-modal">
            <h2 className="add-title">Edit Member</h2>

            <div className="form-group">
              <label>User name</label>
              <input
                className="form-input"
                value={editData?.name || ""}
                onChange={(e) =>
                  setEditData({ ...editData, name: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>Email ID</label>
              <input
                className="form-input"
                value={editData?.email || ""}
                onChange={(e) =>
                  setEditData({ ...editData, email: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>Designation</label>

              <select
                className="dropdown-select"
                value={editData?.role || ""}
                onChange={(e) =>
                  setEditData({ ...editData, role: e.target.value })
                }
              >
                <option>Admin</option>
                <option>Member</option>
              </select>
            </div>

            <div className="add-actions">
              <button
                className="btn-light"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </button>

              <button className="btn-blue" onClick={handleEditSave}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
