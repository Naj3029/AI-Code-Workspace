function ProjectCard({ title, description, onOpen }) {

  return (
    <div className="card">

      <h3>{title}</h3>

      <p>{description}</p>

      <button onClick={onOpen}>
        Open Workspace
      </button>

    </div>
  );
}

export default ProjectCard;