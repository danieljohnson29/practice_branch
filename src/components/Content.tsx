const ContentPage = ({ darkMode }: any) => {
  return (
    <div
      style={{
        padding: 24,
        background: darkMode ? "#2b2b2b" : "#fff",
        color: darkMode ? "#fff" : "#000",
        transition: "background 0.1s, color 0.1s",
        borderRadius:"5px"
      }}
    >
      {/* Content of the page */}
      <h1>Home Page</h1>
      <p>This is the Home of the page.</p>
    </div>
  );
};

export default ContentPage;
