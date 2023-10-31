---
id: schema-builder
title: Schema Builder UI 
sidebar_label: Schema Builder UI
description: Create schemas intuitively by using the Schema Builder UI.
keywords: 
  - docs
  - polygon id
  - issuer node
  - claim
  - verifiable credentials
  - UI
  - schema 
  - builder
---

import useBaseUrl from '@docusaurus/useBaseUrl';

In order to create new types of credentials, it is necessary to generate JSON schemas. These are the underlying files that define the credential attributes. 

[The Schema Builder](https://schema-builder.polygonid.me/) is a tool created to simplify the process of creating schemas by using an intuitive user interface and enabling everyone to check previously made schemas.

Learn more about the Schema Explorer in the video below:

<div align="center">
<iframe src="https://www.youtube.com/embed/FR1UgJo1Irk" width="800" length="800" height="450" allowfullscreen></iframe>
</div>


## Schema Explorer
[The Schema Builder landing page](https://schema-builder.polygonid.me/) presents a Schema Explorer, where you can find all previously created schemas and drill down your search for specific kinds of schemas. Not all schemas need to be created from scratch. 

<div align="center">
<img src= {useBaseUrl("img/schema-explorer.png")} align="center" />
</div>

We highly recommend that you look for one of the available schemas before actually creating one. By doing so, you can save time for your project and leverage a full library of popular ready-to-use schemas.
If you find a schema that is similar to what you need but you are not completely happy with its characteristics, you can always **fork it** and add your own attributes.

<div align="center">
<img src= {useBaseUrl("img/fork-schema.png")} align="center" />
</div>

Forking a schema is similar to GitHub forks. It creates a copy of the schema and lets you define new attributes. So you build your own out of another one.  

<div align="center">
<img src= {useBaseUrl("img/fork-define-schema.png")} align="center" />
</div>

:::info

The outcome of a forked schema shows its version and where it was forked from.
![Fork Version](/img/fork-versions.png)

The forked schema also shows its number of forks:

![Forks](/img/forks.png)

:::

## Schema Builder
As previously stated, [the Schema Builder](https://schema-builder.polygonid.me/builder) is the easiest way to generate new types of credentials as it allows users to define the attributes, data types, and constraints for their schemas. The tool will then generate the necessary JSON-LD files and other artifacts required to implement the schema.

<div align="center">
<img src= {useBaseUrl("img/schema-builder.png")} align="center" />
</div>
Schema form and its JSON outcome.

:::info
    
If you already have access to a file containing a JSON schema or a URL where that schema might be located, you can always add it to the Schema Builder by clicking on the **Import Schema** button. Then you will be able to edit, create new JSON and JSON-LD files and publish it on IPFS.  
    
<div align = "center">

![Import Schema](/img/import-schema.png)

</div>

:::
    
Learn more about the Schema Builder in the video below: 

<div align="center">
<iframe src="https://www.youtube.com/embed/66b_jJYW78A?si=FYF10Tfand0zJD8O" width="800" length="800" height="450" allowfullscreen></iframe>
</div>

### Schema definition
The first page of the Schema Builder flow lets you define the basic aspects of the schema, namely its title, type, version and description.

<div align="center">
<img src= {useBaseUrl("img/define-schema.png")} align="center" />
</div>

- Title: a name for the schema.
- Schema Type: similar to (and in most cases coincides with) the schema name. The text provided in this field will become the name of the type in the JSON LD context associated with this schema. 
- Version: this is important to register the current version of the schema, as it might be updated in the future.
- Description: a description of the schema should explain in simple terms what it will be used for. 

#### Attributes
You can add multiple attributes to your schema. All of them need to have the following characteristics: name, title, data type and description.

<div align="center">
<img src= {useBaseUrl("img/define-attributes.png")} align="center" />
</div>

- Name: the name of the attribute with a limited use of characters.
- Title: a more human-readable title for the attribute without restrictions for special characters or space.
- Data type: the kind of data the schema will support, such as integer, string, boolean etc.
- Description: a short human-readable explanation of the attribute.

Learn about the advanced features of the Schema Builder in the video below:

<div align="center">
<iframe src="https://www.youtube.com/embed/YZEg3iIQFhE?si=6m76mNobUkdf5f4-" width="800" length="800" height="450" allowfullscreen></iframe>
</div>

#### Publish on IPFS or Download JSON file
The last step of building a new schema is publishing it on [IPFS](https://ipfs.tech/). As an alternative, you can download the JSON file and store it in the location of your choice.
    
:::info Non-merklized credentials

Non-merklized credentials are specially important for on-chain issuers, because Solidity can't fetch JSON-LD schemas directly via HTTP or IPFS. 

Here is an example of [a non-merklized schema](https://github.com/iden3/claim-schema-vocab/blob/main/schemas/json-ld/player-nonmerklized.jsonld). Compare it to [this merklized one](https://github.com/iden3/claim-schema-vocab/blob/main/schemas/json-ld/kyc-v4.jsonld). Notice that the schema is defined by utilizing an `iden3_serialization` attribute.

Read more about non-merklized credentials on the <ins>[Iden3 documentation](https://docs.iden3.io/protocol/non-merklized/)</ins>.
:::
