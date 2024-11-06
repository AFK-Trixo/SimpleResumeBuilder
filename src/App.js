import React, { useState } from "react";
import "./App.css";
import html2pdf from "html2pdf.js";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    objective: "",
    email: "",
    phone: "",
    website: "",
    location: "",
    workExperiences: [{ company: "", jobTitle: "", date: "", description: "" }],
    educations: [{ school: "", degree: "", date: "", gpa: "", additionalInfo: "" }],
    projects: [{ projectName: "", date: "", description: "" }],
    skills: "",
    featuredSkills: [
      { skill: "Python", level: 3 },
      { skill: "Java", level: 2 },
      { skill: "OOP", level: 4 },
    ],
  });

  const handleChange = (e, index, section) => {
    const updatedSection = [...formData[section]];
    updatedSection[index][e.target.name] = e.target.value;
    setFormData({ ...formData, [section]: updatedSection });
  };

  const addSection = (section) => {
    const newSection = { company: "", jobTitle: "", date: "", description: "" };
    const newEducation = { school: "", degree: "", date: "", gpa: "", additionalInfo: "" };
    const newProject = { projectName: "", date: "", description: "" };
    setFormData({
      ...formData,
      [section]: [
        ...formData[section],
        section === "workExperiences" ? newSection :
        section === "educations" ? newEducation : newProject,
      ],
    });
  };

  const removeSection = (section, index) => {
    const updatedSection = formData[section].filter((_, i) => i !== index);
    setFormData({ ...formData, [section]: updatedSection });
  };

  const renderCircles = (level, index) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`circle ${i < level ? "filled" : ""}`}
        onClick={() => handleProficiencyChange(index, i + 1)}
      ></span>
    ));
  };

  const handleProficiencyChange = (index, level) => {
    const updatedSkills = [...formData.featuredSkills];
    updatedSkills[index].level = level;
    setFormData({ ...formData, featuredSkills: updatedSkills });
  };

  const downloadResume = () => {
    const element = document.getElementById("resume-preview");
    html2pdf().from(element).save("resume.pdf");
  };

  return (
    <div className="app-container">
      <div className="resume-builder-container">
        <div className="resume-builder">
          <h2>Resume Builder</h2>
          {/* Basic Information */}
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <label>Objective</label>
            <textarea
              name="objective"
              placeholder="Brief Objective Statement"
              value={formData.objective}
              onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
            ></textarea>
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              placeholder="Your Phone Number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            <label>Website</label>
            <input
              type="text"
              name="website"
              placeholder="Your Website or LinkedIn"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            />
            <label>Location</label>
            <input
              type="text"
              name="location"
              placeholder="Your Location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>

          {/* Work Experience Section */}
          <h3>Work Experience</h3>
          {formData.workExperiences.map((experience, index) => (
            <div key={index} className="form-group">
              <input
                type="text"
                name="company"
                placeholder="Company"
                value={experience.company}
                onChange={(e) => handleChange(e, index, "workExperiences")}
              />
              <input
                type="text"
                name="jobTitle"
                placeholder="Job Title"
                value={experience.jobTitle}
                onChange={(e) => handleChange(e, index, "workExperiences")}
              />
              <input
                type="text"
                name="date"
                placeholder="Date"
                value={experience.date}
                onChange={(e) => handleChange(e, index, "workExperiences")}
              />
              <textarea
                name="description"
                placeholder="Description"
                value={experience.description}
                onChange={(e) => handleChange(e, index, "workExperiences")}
              ></textarea>
              <button onClick={() => removeSection("workExperiences", index)} className="remove-button">Remove Job</button>
            </div>
          ))}
          <button onClick={() => addSection("workExperiences")} className="add-button">+ Add Work Experience</button>

          {/* Education Section */}
          <h3>Education</h3>
          {formData.educations.map((education, index) => (
            <div key={index} className="form-group">
              <input
                type="text"
                name="school"
                placeholder="School Name"
                value={education.school}
                onChange={(e) => handleChange(e, index, "educations")}
              />
              <input
                type="text"
                name="degree"
                placeholder="Degree & Major"
                value={education.degree}
                onChange={(e) => handleChange(e, index, "educations")}
              />
              <input
                type="text"
                name="date"
                placeholder="Date"
                value={education.date}
                onChange={(e) => handleChange(e, index, "educations")}
              />
              <input
                type="text"
                name="gpa"
                placeholder="GPA"
                value={education.gpa}
                onChange={(e) => handleChange(e, index, "educations")}
              />
              <textarea
                name="additionalInfo"
                placeholder="Additional Information (Optional)"
                value={education.additionalInfo}
                onChange={(e) => handleChange(e, index, "educations")}
              ></textarea>
              <button onClick={() => removeSection("educations", index)} className="remove-button">Remove Entry</button>
            </div>
          ))}
          <button onClick={() => addSection("educations")} className="add-button">+ Add Education</button>

          {/* Projects Section */}
          <h3>Projects</h3>
          {formData.projects.map((project, index) => (
            <div key={index} className="form-group">
              <input
                type="text"
                name="projectName"
                placeholder="Project Name"
                value={project.projectName}
                onChange={(e) => handleChange(e, index, "projects")}
              />
              <input
                type="text"
                name="date"
                placeholder="Date"
                value={project.date}
                onChange={(e) => handleChange(e, index, "projects")}
              />
              <textarea
                name="description"
                placeholder="Description"
                value={project.description}
                onChange={(e) => handleChange(e, index, "projects")}
              ></textarea>
              <button onClick={() => removeSection("projects", index)} className="remove-button">Remove Project</button>
            </div>
          ))}
          <button onClick={() => addSection("projects")} className="add-button">+ Add Project</button>

          {/* Skills Section */}
          <h3>Skills</h3>
          <textarea
            name="skills"
            placeholder="List your skills"
            value={formData.skills}
            onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
          ></textarea>
          <h4>Featured Skills (Optional)</h4>
          <p>Highlight top skills with proficiency levels.</p>
          {formData.featuredSkills.map((skill, index) => (
            <div key={index} className="featured-skill">
              <input
                type="text"
                placeholder="Featured Skill"
                value={skill.skill}
                onChange={(e) => {
                  const updatedSkills = [...formData.featuredSkills];
                  updatedSkills[index].skill = e.target.value;
                  setFormData({ ...formData, featuredSkills: updatedSkills });
                }}
              />
              <div className="proficiency">{renderCircles(skill.level, index)}</div>
            </div>
          ))}
        </div>

        {/* Resume Preview */}
        <div className="resume-preview" id="resume-preview">
          <div className="preview-header">
            <h2>{formData.name || "Your Name"}</h2>
            <p>{formData.objective || "Objective Statement"}</p>
            <p>
              {formData.email && <span>{formData.email} | </span>}
              {formData.phone && <span>{formData.phone} | </span>}
              {formData.website && <span>{formData.website} | </span>}
              {formData.location}
            </p>
          </div>
          <div className="preview-section">
            <h3>Work Experience</h3>
            {formData.workExperiences.map((exp, index) => (
              <div key={index}>
                <h4>{exp.jobTitle || "Job Title"} at {exp.company || "Company"}</h4>
                <p>{exp.date}</p>
                <p>{exp.description}</p>
              </div>
            ))}
            <h3>Education</h3>
            {formData.educations.map((edu, index) => (
              <div key={index}>
                <h4>{edu.degree} at {edu.school}</h4>
                <p>{edu.date} - GPA: {edu.gpa}</p>
                <p>{edu.additionalInfo}</p>
              </div>
            ))}
            <h3>Projects</h3>
            {formData.projects.map((proj, index) => (
              <div key={index}>
                <h4>{proj.projectName}</h4>
                <p>{proj.date}</p>
                <p>{proj.description}</p>
              </div>
            ))}
            <h3>Skills</h3>
            <p>{formData.skills || "List your skills"}</p>
            <div className="featured-skills-preview">
              <strong>Featured Skills</strong>
              {formData.featuredSkills.map((skill, index) => (
                <div key={index} className="featured-skill-preview">
                  <span>{skill.skill}</span>
                  <div className="proficiency">{renderCircles(skill.level, index)}</div>
                </div>
              ))}
            </div>
          </div>
          <button className="download-button" onClick={downloadResume}>Download PDF</button>
        </div>
      </div>
    </div>
  );
}

export default App;
