import React from 'react'
import Toggle from 'react-toggled'
import { Link } from 'react-router-dom'

import withPackageData from '../../../containers/withPackageData'
import StarTotal from '../../common/utils/StarTotal'

const NpmSection = ({ project }) =>
  <section className="inner npm-section">
    <a
      href={`https://www.npmjs.com/package/${project.npm}`}
      style={{ display: 'flex', alignItems: 'center', marginBottom: '.5rem' }}
      target="_blank"
    >
      <img
        src="https://s3-us-west-2.amazonaws.com/svgporn.com/logos/npm.svg"
        alt="NPM"
        className="npm"
        height="16"
        width="40.95"
        style={{ marginRight: '.25rem' }}
      />
      <span className="link" style={{ marginRight: '.25rem' }}>
        {project.npm}
      </span>
      <span className="version text-secondary">
        {project.version}
      </span>
    </a>
    <Dependencies project={project} />
  </section>

const Dependencies = ({ project }) => {
  const count = project.dependency_count
  if (count === 0) return <span>No dependencies</span>
  return project.dependencies
    ? <DependencyList dependencies={project.dependencies} />
    : <span>Loading...</span>
}

const DependencyList = ({ dependencies }) =>
  <Toggle>
    {({ on, getTogglerProps }) =>
      <div className="dependencies">
        <a className="toggler" {...getTogglerProps()}>
          <span
            className={`octicon octicon-triangle-${on ? 'down' : 'right'} icon`}
          />{' '}
          {dependencies.length}
          {' dependencies'}
        </a>
        {!on && <DependencyListPreview dependencies={dependencies} />}
        <div>
          {on &&
            <ConnectedDependencyFullList
              togglerProps={getTogglerProps()}
              packageNames={dependencies}
            />}
        </div>
      </div>}
  </Toggle>

const DependencyListPreview = ({ dependencies }) =>
  <span className="inline-list" style={{ marginLeft: '.5rem' }}>
    {dependencies.map(packageName =>
      <span key={packageName}>
        {packageName}
      </span>
    )}
  </span>

const DependencyFullList = ({ packages }) => {
  return (
    <table className="block-list">
      <thead>
        <tr>
          <td>Package on npm</td>
          <td>Project on bestof.js.org</td>
        </tr>
      </thead>
      <tbody>
        {packages.map(npmPackage =>
          <tr key={npmPackage.name}>
            <td>
              <a href={`https://npm.im/${npmPackage.name}`} target="_blank">
                {npmPackage.name}
              </a>
            </td>
            <td>
              {npmPackage.project
                ? <span>
                    <Link
                      to={`/projects/${npmPackage.project.slug}`}
                      styleX={{
                        textDecoration: 'underline'
                      }}
                      className="text-secondary"
                    >
                      {npmPackage.project.name}{' '}
                      <StarTotal value={npmPackage.project.stars} icon />
                    </Link>
                    <span className="text-secondary" />
                  </span>
                : <span style={{ color: '#ccc' }}>N/A</span>}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

const ConnectedDependencyFullList = withPackageData(DependencyFullList)

export default NpmSection
