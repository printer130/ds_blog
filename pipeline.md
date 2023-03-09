---
jupyter:
  kernelspec:
    display_name: .venv
    language: python
    name: python3
  language_info:
    codemirror_mode:
      name: ipython
      version: 3
    file_extension: .py
    mimetype: text/x-python
    name: python
    nbconvert_exporter: python
    pygments_lexer: ipython3
    version: 3.9.2
  nbformat: 4
  nbformat_minor: 2
  vscode:
    interpreter:
      hash: d1d373f94afa315b056f4d2a019e2a6089684a81d7c5fa45ccb691ad54fac45f
---

::: {.cell .markdown}
## **PIPELINE**

En esta última práctica, veremos cómo realizar la puesta en producción
de un modelo de Machine Learning.

El pipeline es una forma de codificar y automatizar el workflow
necesario para producir un modelo de Machine Learning. Los pipelines en
ML constan de varios pasos secuenciales que hacen de todo, desde la
extracción y el preprocesamiento de datos hasta el entrenamiento y la
implementación de modelos.

En definitiva, nos ayuda a automatizar un flujo de trabajo de Machine
Learning.

`<img src = "../_src/assets/pipeline_2.jpg" height = 350>`{=html}

Uno de sus grandes beneficios y aplicabilidad reside en la
escalabilidad. A su vez, destaca entre sus ventajas que simplifica la
aplicación de cross-validation y optimización de hiperparámetros.

Con este enfoque, podemos *empaquetar* todas las acciones que van desde
el preprocesamiento de los datos hasta las predicciones del modelo en un
único objeto.

La librería `Scikit-learn` incluye una clase, denominada precisamente
**pipeline**, que está diseñada para poder manipular y aplicar una serie
de transformaciones de datos seguida de la aplicación de un modelo de
ML. En otras palabras, con esta clase podemos instanciar un objeto que
incluya todo el flujo del preprocesamiento de datos -desde la limpieza,
normalización, escalado, transformación, reducción de dimensionalidad
hasta ingeniería de features- y el modelo predictivo con el cual haremos
las inferencias.

También Scikit-learn nos brinda la posibilidad de hacer nuestro pipeline
con la clase **make_pipeline**. Veamos brevemente en qué se diferencia
una de la otra.

  -----------------------------------------------------------------------
  Pipeline                            Make_pipeline
  ----------------------------------- -----------------------------------
  Hay que especificar todos los pasos No hay que indicar un nombre para
  secuenciales en una lista           cada paso

  Cada paso es una tupla con el       Se pueden encadenar todos los pasos
  nombre del paso y su nombre oficial usando sus nombres oficiales en
  en Scikit-learn                     Scikit-learn

  Ejemplo: `a`                        Ejemplo: `b`
  -----------------------------------------------------------------------

``` python

'a' Pipeline([('imputer', SimpleImputer(strategy='median')),('scaler', StandardScaler())])
```

``` python

'b' make_pipeline(SimpleImputer(strategy='median'), StandardScaler())
```

------------------------------------------------------------------------
:::

::: {.cell .markdown}
## `Práctica`

Para la realización de esta práctica construiremos tres pipelines, cada
uno con un modelo diferente.

Primero haremos algunos pasos del preprocesamiento de datos, luego
adaptaremos nuestros modelos. Para finalizar, compararemos la
performance de los modelos y buscaremos identificar el mejor de ellos.
Una vez obtenido, lo guardamos en un archivo.
:::

::: {.cell .code execution_count="1"}
``` python
# Cargamos los datos con los que vamos a estar trabajando
from sklearn.datasets import load_iris
iris = load_iris()
```
:::

::: {.cell .code execution_count="2"}
``` python
# Separamos los datos en train y test
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(iris.data, iris.target, test_size=0.2, random_state=42)
```
:::

::: {.cell .markdown}
A continuación, crearemos los tres pipelines. Los modelos que usaremos
serán: regresión logística, support vector machine y árbol de decisión.
Respecto al preprocesamiento, aplicaremos un escalado de datos con
`Standard Scaler` y haremos reducción de dimensionalidad con `PCA`.
:::

::: {.cell .code execution_count="3"}
``` python
# Importamos las librerías necesarias

from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression
from sklearn import svm
from sklearn import tree
```
:::

::: {.cell .code execution_count="4"}
``` python
# Creamos el primer pipeline

pipe_lr = Pipeline([('scl', StandardScaler()),
			('pca', PCA(n_components=2)),
			('clf', LogisticRegression(random_state=42))])
```
:::

::: {.cell .code execution_count="5"}
``` python
# Creamos el segundo pipeline

pipe_svm = Pipeline([('scl', StandardScaler()),
			('pca', PCA(n_components=2)),
			('clf', svm.SVC(random_state=42))])
			
```
:::

::: {.cell .code execution_count="6"}
``` python
# Creamos el tercer pipeline

pipe_dt = Pipeline([('scl', StandardScaler()),
			('pca', PCA(n_components=2)),
			('clf', tree.DecisionTreeClassifier(random_state=42))])
```
:::

::: {.cell .code execution_count="7"}
``` python
# Los guardamos en una lista

pipelines = [pipe_lr, pipe_svm, pipe_dt]
```
:::

::: {.cell .code execution_count="8"}
``` python
# Hacemos un diccionario para fines organizativos

pipe_dict = {0: 'Regresión Logística', 1: 'SVM', 2: 'Árbol de decisión'}
```
:::

::: {.cell .code execution_count="9"}
``` python
# Entrenamos

for pipe in pipelines:
	pipe.fit(X_train, y_train)
```
:::

::: {.cell .code execution_count="10"}
``` python
# Evaluamos

for idx, val in enumerate(pipelines):
	print('%s pipeline accuracy en test: %.3f' % (pipe_dict[idx], val.score(X_test, y_test)))
```

::: {.output .stream .stdout}
    Regresión Logística pipeline accuracy en test: 0.900
    SVM pipeline accuracy en test: 0.900
    Árbol de decisión pipeline accuracy en test: 0.867
:::
:::

::: {.cell .code execution_count="11"}
``` python
# Identificamos el mejor modelo para el set de testeo

best_acc = 0.0
best_clf = 0
best_pipe = ''
for idx, val in enumerate(pipelines):
	if val.score(X_test, y_test) > best_acc:
		best_acc = val.score(X_test, y_test)
		best_pipe = val
		best_clf = idx
print('Modelo con el mejor accuracy: %s' % pipe_dict[best_clf])
```

::: {.output .stream .stdout}
    Modelo con el mejor accuracy: Regresión Logística
:::
:::

::: {.cell .code execution_count="12"}
``` python
# Guardamos el pipeline en un archivo

import joblib #pickle es alternativa

joblib.dump(best_pipe, 'Mejor_pipeline.pkl', compress=1)
print('Pipeline de %s guardado a archivo' % pipe_dict[best_clf])
```

::: {.output .stream .stdout}
    Pipeline de Regresión Logística guardado a archivo
:::
:::

::: {.cell .code execution_count="13"}
``` python
best_model = joblib.load('Mejor_pipeline.pkl')

X_train, X_test, y_train, y_test = train_test_split(iris.data, iris.target, test_size=0.2, random_state=100)
```
:::

::: {.cell .markdown}

------------------------------------------------------------------------
:::

::: {.cell .code execution_count="14"}
``` python
best_model.fit(X_train,y_train)
```

::: {.output .execute_result execution_count="14"}
```{=html}
<style>#sk-container-id-1 {color: black;background-color: white;}#sk-container-id-1 pre{padding: 0;}#sk-container-id-1 div.sk-toggleable {background-color: white;}#sk-container-id-1 label.sk-toggleable__label {cursor: pointer;display: block;width: 100%;margin-bottom: 0;padding: 0.3em;box-sizing: border-box;text-align: center;}#sk-container-id-1 label.sk-toggleable__label-arrow:before {content: "▸";float: left;margin-right: 0.25em;color: #696969;}#sk-container-id-1 label.sk-toggleable__label-arrow:hover:before {color: black;}#sk-container-id-1 div.sk-estimator:hover label.sk-toggleable__label-arrow:before {color: black;}#sk-container-id-1 div.sk-toggleable__content {max-height: 0;max-width: 0;overflow: hidden;text-align: left;background-color: #f0f8ff;}#sk-container-id-1 div.sk-toggleable__content pre {margin: 0.2em;color: black;border-radius: 0.25em;background-color: #f0f8ff;}#sk-container-id-1 input.sk-toggleable__control:checked~div.sk-toggleable__content {max-height: 200px;max-width: 100%;overflow: auto;}#sk-container-id-1 input.sk-toggleable__control:checked~label.sk-toggleable__label-arrow:before {content: "▾";}#sk-container-id-1 div.sk-estimator input.sk-toggleable__control:checked~label.sk-toggleable__label {background-color: #d4ebff;}#sk-container-id-1 div.sk-label input.sk-toggleable__control:checked~label.sk-toggleable__label {background-color: #d4ebff;}#sk-container-id-1 input.sk-hidden--visually {border: 0;clip: rect(1px 1px 1px 1px);clip: rect(1px, 1px, 1px, 1px);height: 1px;margin: -1px;overflow: hidden;padding: 0;position: absolute;width: 1px;}#sk-container-id-1 div.sk-estimator {font-family: monospace;background-color: #f0f8ff;border: 1px dotted black;border-radius: 0.25em;box-sizing: border-box;margin-bottom: 0.5em;}#sk-container-id-1 div.sk-estimator:hover {background-color: #d4ebff;}#sk-container-id-1 div.sk-parallel-item::after {content: "";width: 100%;border-bottom: 1px solid gray;flex-grow: 1;}#sk-container-id-1 div.sk-label:hover label.sk-toggleable__label {background-color: #d4ebff;}#sk-container-id-1 div.sk-serial::before {content: "";position: absolute;border-left: 1px solid gray;box-sizing: border-box;top: 0;bottom: 0;left: 50%;z-index: 0;}#sk-container-id-1 div.sk-serial {display: flex;flex-direction: column;align-items: center;background-color: white;padding-right: 0.2em;padding-left: 0.2em;position: relative;}#sk-container-id-1 div.sk-item {position: relative;z-index: 1;}#sk-container-id-1 div.sk-parallel {display: flex;align-items: stretch;justify-content: center;background-color: white;position: relative;}#sk-container-id-1 div.sk-item::before, #sk-container-id-1 div.sk-parallel-item::before {content: "";position: absolute;border-left: 1px solid gray;box-sizing: border-box;top: 0;bottom: 0;left: 50%;z-index: -1;}#sk-container-id-1 div.sk-parallel-item {display: flex;flex-direction: column;z-index: 1;position: relative;background-color: white;}#sk-container-id-1 div.sk-parallel-item:first-child::after {align-self: flex-end;width: 50%;}#sk-container-id-1 div.sk-parallel-item:last-child::after {align-self: flex-start;width: 50%;}#sk-container-id-1 div.sk-parallel-item:only-child::after {width: 0;}#sk-container-id-1 div.sk-dashed-wrapped {border: 1px dashed gray;margin: 0 0.4em 0.5em 0.4em;box-sizing: border-box;padding-bottom: 0.4em;background-color: white;}#sk-container-id-1 div.sk-label label {font-family: monospace;font-weight: bold;display: inline-block;line-height: 1.2em;}#sk-container-id-1 div.sk-label-container {text-align: center;}#sk-container-id-1 div.sk-container {/* jupyter's `normalize.less` sets `[hidden] { display: none; }` but bootstrap.min.css set `[hidden] { display: none !important; }` so we also need the `!important` here to be able to override the default hidden behavior on the sphinx rendered scikit-learn.org. See: https://github.com/scikit-learn/scikit-learn/issues/21755 */display: inline-block !important;position: relative;}#sk-container-id-1 div.sk-text-repr-fallback {display: none;}</style><div id="sk-container-id-1" class="sk-top-container"><div class="sk-text-repr-fallback"><pre>Pipeline(steps=[(&#x27;scl&#x27;, StandardScaler()), (&#x27;pca&#x27;, PCA(n_components=2)),
                (&#x27;clf&#x27;, LogisticRegression(random_state=42))])</pre><b>In a Jupyter environment, please rerun this cell to show the HTML representation or trust the notebook. <br />On GitHub, the HTML representation is unable to render, please try loading this page with nbviewer.org.</b></div><div class="sk-container" hidden><div class="sk-item sk-dashed-wrapped"><div class="sk-label-container"><div class="sk-label sk-toggleable"><input class="sk-toggleable__control sk-hidden--visually" id="sk-estimator-id-1" type="checkbox" ><label for="sk-estimator-id-1" class="sk-toggleable__label sk-toggleable__label-arrow">Pipeline</label><div class="sk-toggleable__content"><pre>Pipeline(steps=[(&#x27;scl&#x27;, StandardScaler()), (&#x27;pca&#x27;, PCA(n_components=2)),
                (&#x27;clf&#x27;, LogisticRegression(random_state=42))])</pre></div></div></div><div class="sk-serial"><div class="sk-item"><div class="sk-estimator sk-toggleable"><input class="sk-toggleable__control sk-hidden--visually" id="sk-estimator-id-2" type="checkbox" ><label for="sk-estimator-id-2" class="sk-toggleable__label sk-toggleable__label-arrow">StandardScaler</label><div class="sk-toggleable__content"><pre>StandardScaler()</pre></div></div></div><div class="sk-item"><div class="sk-estimator sk-toggleable"><input class="sk-toggleable__control sk-hidden--visually" id="sk-estimator-id-3" type="checkbox" ><label for="sk-estimator-id-3" class="sk-toggleable__label sk-toggleable__label-arrow">PCA</label><div class="sk-toggleable__content"><pre>PCA(n_components=2)</pre></div></div></div><div class="sk-item"><div class="sk-estimator sk-toggleable"><input class="sk-toggleable__control sk-hidden--visually" id="sk-estimator-id-4" type="checkbox" ><label for="sk-estimator-id-4" class="sk-toggleable__label sk-toggleable__label-arrow">LogisticRegression</label><div class="sk-toggleable__content"><pre>LogisticRegression(random_state=42)</pre></div></div></div></div></div></div></div>
```
:::
:::

::: {.cell .code execution_count="15"}
``` python
best_model.score(X_test, y_test)
```

::: {.output .execute_result execution_count="15"}
    0.9333333333333333
:::
:::
