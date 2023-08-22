---
id: get-vocabs
title: Get Vocabulary
sidebar_label: Get Vocabulary
description: The getVocabsFromIden3Message() method gets the vocabulary JSON-LD files to translate the values of the schemas to be used by Integrators in a human-readable form.
keywords:
  - docs
  - polygon id
  - holder
  - issuer
  - verifier
  - wallet sdk
---
 
It gets the vocabulary JSON-LD files to translate the values of the schemas to be used by Integrators in a human-readable form in their apps.

The `getVocabsFromIden3Message()` method uses `Iden3MessageEntity` as the input parameter and returns a list of maps of vocabulary JSON-LD files. 

```
Future<List<Map<String, dynamic>>> getVocabsFromIden3Message({
  required Iden3MessageEntity message
});
```
