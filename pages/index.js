const Index = ({ title, description, ...props }) => {
  return (
    <div>
      <h1>Thank You For Your Interest</h1>
      <p style={{ color: 'darkgray', opacity: .8 }}>We know you're a talented developer</p>
    </div>
  )
};

export default Index;

export async function getStaticProps() {
  const configData = await import('../siteconfig.json');

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description
    }
  }
}