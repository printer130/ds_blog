---
title: "Visualización"
description: "Reducción de dimensionalidad"
pubDate: "Jul 08 2022"
heroImage: "/placeholder-hero.jpg"
url: "/ensamblers"
---

## Reducción de dimensionalidad para Visualización

``` python
# libraries
from mpl_toolkits.mplot3d import Axes3D
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
```

``` python
# Dataset
df=pd.DataFrame({'X': range(1,101), 'Y': np.random.randn(100)*15+range(1,101), 'Z': (np.random.randn(100)*15+range(1,101))*2 })
```

``` python
# plot
fig = plt.figure()
ax = fig.add_subplot(111, projection='3d')
ax.scatter(df['X'], df['Y'], df['Z'], s=60)
ax.view_init(30, 40)
plt.show()
```

<img src="/m6_practice_5/0903faa87de0327873b73443541a0a675e41ae10.png" alt="visualization" />

``` python
df=pd.DataFrame({'X':(0,0,1,3,5,1,3), 'Y':(6,5,5,4,0,5,4), 'Z':(0,0,5,12,0,0,0), 'color':('red','red','blue','blue','red','blue','blue')})
```

``` python
# plot
fig = plt.figure()
ax = fig.add_subplot(111, projection='3d')
ax.scatter(df['X'], df['Y'], df['Z'], c=df['color'], s=60)
ax.scatter(df['X'], df['Y'], df['Z'], s=60)
ax.view_init(30, 40)
plt.show()
```

<img src="/m6_practice_5/46ea85ef2cb54ba3aa3ca5e72cd148f774fed780.png" alt="visualization" />

``` python
data = pd.read_csv('../DataSets/iris_dataset.csv', index_col = 0)
data.head()
```

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>sepal_length</th>
      <th>sepal_width</th>
      <th>petal_length</th>
      <th>petal_width</th>
      <th>species</th>
    </tr>
    <tr>
      <th>fila</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>fila1</th>
      <td>5.1</td>
      <td>3.5</td>
      <td>1.4</td>
      <td>0.2</td>
      <td>setosa</td>
    </tr>
    <tr>
      <th>fila2</th>
      <td>4.9</td>
      <td>3.0</td>
      <td>1.4</td>
      <td>0.2</td>
      <td>setosa</td>
    </tr>
    <tr>
      <th>fila3</th>
      <td>4.7</td>
      <td>3.2</td>
      <td>1.3</td>
      <td>0.2</td>
      <td>setosa</td>
    </tr>
    <tr>
      <th>fila4</th>
      <td>4.6</td>
      <td>3.1</td>
      <td>1.5</td>
      <td>0.2</td>
      <td>setosa</td>
    </tr>
    <tr>
      <th>fila5</th>
      <td>5.0</td>
      <td>3.6</td>
      <td>1.4</td>
      <td>0.2</td>
      <td>setosa</td>
    </tr>
  </tbody>
</table>

``` python
data1 = data[['sepal_length','sepal_width','petal_length','petal_width']].to_numpy()
data2 = data[['species']].to_numpy()
```

``` python
data1.shape
```

    (150, 4)

``` python
data2.shape
```

    (150, 1)

``` python
mU, mD, mV = np.linalg.svd(data1)
```

``` python
mU.shape
```

    (150, 150)

``` python
mD.shape
```

    (4,)

``` python
i = 3
matizresultante = np.matrix(mU[:, :i]) * np.diag(mD[:i])# * np.matrix(mV[:i, :])
```

``` python
matizresultante.shape
```

    (150, 3)

``` python
print("Matriz ", i, ":\n",matizresultante)
```

    Matriz  3 :
     [[-5.91220352e+00  2.30344211e+00 -1.93713090e-04]
     [-5.57207573e+00  1.97383104e+00  2.37434025e-01]
     [-5.44648470e+00  2.09653267e+00  8.01625378e-03]
     ...
     [-9.02610098e+00 -8.83219863e-01 -1.43961269e-01]
     [-9.10565990e+00 -9.96220532e-01 -7.36832032e-01]
     [-8.49050919e+00 -9.14876875e-01 -3.30083776e-01]]

``` python
x1 = np.squeeze(np.asarray(matizresultante[:,0]))
```

``` python
x2 = np.squeeze(np.asarray(matizresultante[:,1]))
```

``` python
x3 = np.squeeze(np.asarray(matizresultante[:,2]))
```

``` python
y = data2[:,0]
```

``` python
y.shape
```

    (150,)

``` python
x1.shape
```

    (150,)

``` python
color = ['red', 'green', 'blue']
```

``` python
data_svd = pd.DataFrame({'x1':x1, 'x2':x2, 'x3':x3, 'y':y})
# df.plot('x', 'y', kind='scatter')
```

``` python
data_svd.head()
```

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>x1</th>
      <th>x2</th>
      <th>x3</th>
      <th>y</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>-5.912204</td>
      <td>2.303442</td>
      <td>-0.000194</td>
      <td>setosa</td>
    </tr>
    <tr>
      <th>1</th>
      <td>-5.572076</td>
      <td>1.973831</td>
      <td>0.237434</td>
      <td>setosa</td>
    </tr>
    <tr>
      <th>2</th>
      <td>-5.446485</td>
      <td>2.096533</td>
      <td>0.008016</td>
      <td>setosa</td>
    </tr>
    <tr>
      <th>3</th>
      <td>-5.436019</td>
      <td>1.871681</td>
      <td>0.014632</td>
      <td>setosa</td>
    </tr>
    <tr>
      <th>4</th>
      <td>-5.875066</td>
      <td>2.329348</td>
      <td>-0.117639</td>
      <td>setosa</td>
    </tr>
  </tbody>
</table>

``` python
# plot
fig = plt.figure()
ax = fig.add_subplot(111, projection='3d')
i = 0
for especie in ['virginica', 'setosa', 'versicolor']:
    ax.scatter(data_svd[data_svd.y == especie]['x1'],
               data_svd[data_svd.y == especie]['x2'],
               data_svd[data_svd.y == especie]['x3'],
               c=color[i], s=10, label=especie)
    i = i + 1

ax.view_init(45, 120)
ax.legend()
plt.show()
```

<img src="/m6_practice_5/d529024a36b060c57c42adf7d086c36c77d21a58.png" alt="visualization" />
