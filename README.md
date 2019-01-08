Nodejs setup

```sh

- script: |
    npm install
    npm run build
    npm test
  displayName: 'Node.js API npm install and build'

- task: PublishBuildArtifacts@1
  inputs:
    pathtoPublish: '$(Build.SourcesDirectory)/api/build/src' 
    artifactName: 'Publish Node API' 
  displayName: 'Publish Node API source'

- task: PublishBuildArtifacts@1
  inputs:
    pathtoPublish: '$(Build.SourcesDirectory)/api/web.config' 
    artifactName: 'Publish Node API' 
  displayName: 'Publish Node API config'

- task: PublishBuildArtifacts@1
  inputs:
    pathtoPublish: '$(Build.SourcesDirectory)/api/package.json' 
    artifactName: 'Publish Node API' 
  displayName: 'Publish Node API package.json'

```