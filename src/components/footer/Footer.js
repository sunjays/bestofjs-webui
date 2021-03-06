import React from 'react'
import fromNow from '../../helpers/fromNow'

const Footer = ({ staticContent, lastUpdate }) => {
  const { repo, projectName, version } = staticContent
  return (
    <div id="footer">
      <p>
        {projectName} is a project by{' '}
        <a href="https://michaelrambeau.com">Michael Rambeau</a> made in Osaka,
        Japan.
      </p>
      <p>
        View the code on <a href={repo}>GitHub</a> (version {version})
      </p>
      <p>
        Data updated from GitHub everyday. Last update: {fromNow(lastUpdate)}
      </p>
      <a
        href="https://js.org"
        target="_blank"
        rel="noopener noreferrer"
        title="JS.ORG | JavaScript Community"
      >
        <img
          src="/images/dark_horz.png"
          width="102"
          alt="JS.ORG Logo"
          style={{ marginTop: '1rem' }}
        />
      </a>
    </div>
  )
}

export default Footer
