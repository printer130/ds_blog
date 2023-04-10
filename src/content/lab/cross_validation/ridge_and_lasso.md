---
title: "Regularización Ridge y Lasso"
description: "Como vimos en la práctica de la primera clase -cuando instanciamos
distintos modelos de regresión lineal- podíamos emplear atributos
polinómicos para aplicar una regresión lineal a un problema no lineal."
pubDate: "Jul 08 2022"
heroImage: "/placeholder-hero.jpg"
url: "/ensamblers"
---

---

Para encontrar la mejor función lineal que se ajuste a nuestros datos,
se debe buscar la combinación de $m$ (pendiente) y $b$ (ordenada al
origen) que minimiza la `función de costo` -ya profundizaremos sobre
ella en la Práctica_03-. Un método para esto, conocido como método de
cuadrados mínimos, consiste en minimizar el MSE. de esa forma, se
obtienen los mejores parámetros.

Cada vez que agregamos un atributo, estamos agregando una dimensión al
problema. En la función de costo, significa un nuevo parámetro a
obtener. Procesar los datos de esta manera puede llevar a un
overfitting. Cuanto más alto el grado de nuestro polynomial features,
más posibilidades de que un polinomio sobreajuste los datos.

Entonces, debemos forzar al modelo para que sea lo más simple posible.
Esto hace la **`regularización`**. Y lo hace penalizando, en la función
de costo, los parámetros del modelo. Introduce un término que castiga
los valores altos para los parámetros del modelo.

Resumiendo:

1.  Un modelo muy complejo tiene a sobreajustar los datos
2.  Al introducir atributos polinómicos en nuestro dataset y usar
    regresión lineal, estamos permitiendo modelos muy complejos
3.  La regularización penaliza modelos complejos y favorece modelos
    simples

Una ventaja es que la regularización determina cuáles atributos son
relevantes para el modelo y cuáles no. Es una herramienta que no solo
sirve para regresión lineal. Se aplica mucho en redes neuronales.

`Regularización L2 o Ridge`

<img alt="ridge y lasso" src= "/assets/ridge.png">

Se agrega a la función de costo un término proporcional al **cuadrado**
del valor de los coeficientes de peso.

Tiene el efecto de reducir de forma proporcional el valor de todos los
coeficientes del modelo, pero sin que estos lleguen a cero.

El grado de penalización está controlado por el hiperparámetro λ. Cuanto
más alto, más regularizado es el modelo.

`Regularización L1 o Lasso`

<img alt="ridge y lasso" src= "/assets/RSS_lasso.jpg">

Se agrega a la función de costo un término proporcional al **valor
absoluto** de los coeficientes de peso.

Tiene el efecto de forzar a que los coeficientes de los predictores
tiendan a cero. Dado que un predictor con coeficiente de regresión cero
no influye en el modelo, Lasso consigue excluir los predictores menos
relevantes.

Aquí también el grado de penalización lo controla el hiperparámetro λ.
Cuanto más alto, más predictores quedan excluidos.

## Práctica

Vamos a comenzar con un ejemplo controlado. Supongamos que tenemos un
dataset con dos atributos, $x$ e $y$, y la relación entre ellos es
$y = -1.5x^4+3x^2+1$

``` python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
sns.set()
```

``` python
# Generamos nuestros datos

n = 300
x = np.linspace(-1,1,n)
y_real = -1.5*x**4+3*x**2+1
y = y_real + 0.1*np.random.randn(n)
```

``` python
# Ploteamos los datos

plt.figure(figsize = (14,8))
plt.scatter(x,y, s = 2, label = 'Datos')
plt.plot(x, y_real, '--',label ='Curva teórica', c = 'r')
plt.xlabel('x')
plt.ylabel('y')
plt.legend()
plt.show()
```
<img src="/m5/2/f86548911dd221b6000bb4135af8f088de233352.png" alt="lasso and ridge" >

``` python
from sklearn.model_selection import train_test_split

X = x.reshape(-1,1)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, random_state=42)
```

``` python
from sklearn.linear_model import LinearRegression

# Instanciamos una regresión lineal
reg_1 = LinearRegression()

# Entrenamos
reg_1.fit(X_train, y_train)
```

<style>#sk-container-id-1 {color: black;background-color: white;}#sk-container-id-1 pre{padding: 0;}#sk-container-id-1 div.sk-toggleable {background-color: white;}#sk-container-id-1 label.sk-toggleable__label {cursor: pointer;display: block;width: 100%;margin-bottom: 0;padding: 0.3em;box-sizing: border-box;text-align: center;}#sk-container-id-1 label.sk-toggleable__label-arrow:before {content: "▸";float: left;margin-right: 0.25em;color: #696969;}#sk-container-id-1 label.sk-toggleable__label-arrow:hover:before {color: black;}#sk-container-id-1 div.sk-estimator:hover label.sk-toggleable__label-arrow:before {color: black;}#sk-container-id-1 div.sk-toggleable__content {max-height: 0;max-width: 0;overflow: hidden;text-align: left;background-color: #f0f8ff;}#sk-container-id-1 div.sk-toggleable__content pre {margin: 0.2em;color: black;border-radius: 0.25em;background-color: #f0f8ff;}#sk-container-id-1 input.sk-toggleable__control:checked~div.sk-toggleable__content {max-height: 200px;max-width: 100%;overflow: auto;}#sk-container-id-1 input.sk-toggleable__control:checked~label.sk-toggleable__label-arrow:before {content: "▾";}#sk-container-id-1 div.sk-estimator input.sk-toggleable__control:checked~label.sk-toggleable__label {background-color: #d4ebff;}#sk-container-id-1 div.sk-label input.sk-toggleable__control:checked~label.sk-toggleable__label {background-color: #d4ebff;}#sk-container-id-1 input.sk-hidden--visually {border: 0;clip: rect(1px 1px 1px 1px);clip: rect(1px, 1px, 1px, 1px);height: 1px;margin: -1px;overflow: hidden;padding: 0;position: absolute;width: 1px;}#sk-container-id-1 div.sk-estimator {font-family: monospace;background-color: #f0f8ff;border: 1px dotted black;border-radius: 0.25em;box-sizing: border-box;margin-bottom: 0.5em;}#sk-container-id-1 div.sk-estimator:hover {background-color: #d4ebff;}#sk-container-id-1 div.sk-parallel-item::after {content: "";width: 100%;border-bottom: 1px solid gray;flex-grow: 1;}#sk-container-id-1 div.sk-label:hover label.sk-toggleable__label {background-color: #d4ebff;}#sk-container-id-1 div.sk-serial::before {content: "";position: absolute;border-left: 1px solid gray;box-sizing: border-box;top: 0;bottom: 0;left: 50%;z-index: 0;}#sk-container-id-1 div.sk-serial {display: flex;flex-direction: column;align-items: center;background-color: white;padding-right: 0.2em;padding-left: 0.2em;position: relative;}#sk-container-id-1 div.sk-item {position: relative;z-index: 1;}#sk-container-id-1 div.sk-parallel {display: flex;align-items: stretch;justify-content: center;background-color: white;position: relative;}#sk-container-id-1 div.sk-item::before, #sk-container-id-1 div.sk-parallel-item::before {content: "";position: absolute;border-left: 1px solid gray;box-sizing: border-box;top: 0;bottom: 0;left: 50%;z-index: -1;}#sk-container-id-1 div.sk-parallel-item {display: flex;flex-direction: column;z-index: 1;position: relative;background-color: white;}#sk-container-id-1 div.sk-parallel-item:first-child::after {align-self: flex-end;width: 50%;}#sk-container-id-1 div.sk-parallel-item:last-child::after {align-self: flex-start;width: 50%;}#sk-container-id-1 div.sk-parallel-item:only-child::after {width: 0;}#sk-container-id-1 div.sk-dashed-wrapped {border: 1px dashed gray;margin: 0 0.4em 0.5em 0.4em;box-sizing: border-box;padding-bottom: 0.4em;background-color: white;}#sk-container-id-1 div.sk-label label {font-family: monospace;font-weight: bold;display: inline-block;line-height: 1.2em;}#sk-container-id-1 div.sk-label-container {text-align: center;}#sk-container-id-1 div.sk-container {/* jupyter's `normalize.less` sets `[hidden] { display: none; }` but bootstrap.min.css set `[hidden] { display: none !important; }` so we also need the `!important` here to be able to override the default hidden behavior on the sphinx rendered scikit-learn.org. See: https://github.com/scikit-learn/scikit-learn/issues/21755 */display: inline-block !important;position: relative;}#sk-container-id-1 div.sk-text-repr-fallback {display: none;}</style><div id="sk-container-id-1" class="sk-top-container"><div class="sk-text-repr-fallback"><pre>LinearRegression()</pre><b>In a Jupyter environment, please rerun this cell to show the HTML representation or trust the notebook. <br />On GitHub, the HTML representation is unable to render, please try loading this page with nbviewer.org.</b></div><div class="sk-container" hidden><div class="sk-item"><div class="sk-estimator sk-toggleable"><input class="sk-toggleable__control sk-hidden--visually" id="sk-estimator-id-1" type="checkbox" checked><label for="sk-estimator-id-1" class="sk-toggleable__label sk-toggleable__label-arrow">LinearRegression</label><div class="sk-toggleable__content"><pre>LinearRegression()</pre></div></div></div></div></div>

``` python
# Predecimos

y_train_pred_1 = reg_1.predict(X_train)
y_test_pred_1 = reg_1.predict(X_test)
```

``` python
# Graficamos

plt.figure(figsize = (14,8))
plt.scatter(x,y, s = 2, label = 'Datos')
plt.plot(x, y_real, '--',label ='Curva teórica', c = 'r')
plt.scatter(X_test,y_test_pred_1,label ='Regresión lineal (Test)', c = 'g')
plt.xlabel('x')
plt.ylabel('y')
plt.legend()
plt.show()
```

<img src="/m5/2/9e0a9c28238d3d26cd6b07975a9f962153387a5d.png" alt="lasso and ridge" >

*Claramente no es un buen modelo, porque los datos no siguen una
relación lineal.*

``` python
from sklearn.metrics import mean_squared_error

rmse_train = np.sqrt(mean_squared_error(y_train, y_train_pred_1))
rmse_test = np.sqrt(mean_squared_error(y_test, y_test_pred_1))
print(f'Raíz del error cuadrático medio en Train: {rmse_train}')
print(f'Raíz del error cuadrático medio en Test: {rmse_test}')

plt.figure(figsize = (16,6))

plt.subplot(1,2,1)
sns.distplot(y_train - y_train_pred_1, bins = 20, label = 'Train')
sns.distplot(y_test - y_test_pred_1, bins = 20, label = 'Test')
plt.xlabel('Errores')
plt.legend()


ax = plt.subplot(1,2,2)
ax.scatter(y_test,y_test_pred_1, s =2)

lims = [
np.min([ax.get_xlim(), ax.get_ylim()]),  
np.max([ax.get_xlim(), ax.get_ylim()]),
]

ax.plot(lims, lims, 'k-', alpha=0.75, zorder=0)
plt.xlabel('y (test)')
plt.ylabel('y_pred (test)')

plt.tight_layout()
plt.show()
```

    Raíz del error cuadrático medio en Train: 0.5404531775884659
    Raíz del error cuadrático medio en Test: 0.5177595281278552


<img src="/m5/2/00babd3ed48c5b943b05bd403e2098d711e140a7.png" alt="lasso and ridge" >

**Usaremos atributos polinómicos para mejorar el modelado**

``` python
# Creamos una función que nos permitirá evaluar nuestros modelos

def evaluar_regresion(model,x,y, X_train, X_test, y_train, y_test):
    
    y_train_pred = model.predict(X_train)
    y_test_pred = model.predict(X_test)
    
    ### Calculamos el error
    rmse_train = np.sqrt(mean_squared_error(y_train, y_train_pred))
    rmse_test = np.sqrt(mean_squared_error(y_test, y_test_pred))

    print(f'Raíz del error cuadrático medio en Train: {rmse_train}')
    print(f'Raíz del error cuadrático medio en Test: {rmse_test}')

    
    ### Graficamos
    plt.figure(figsize = (12,4))
    plt.subplot(1,3,1)
    plt.scatter(x,y, s = 2, label = 'Datos')
    plt.plot(x, y_real, '--',label ='Curva teórica', c = 'r')
    
    list1, list2 = zip(*sorted(zip(X_train[:,0], y_train_pred)))
    plt.plot(list1, list2,label ='Regresión (train)')
    
    list1, list2 = zip(*sorted(zip(X_test[:,0], y_test_pred)))
    plt.plot(list1, list2,label = 'Regresión (test)')

    plt.xlabel('x')
    plt.ylabel('y')
    plt.legend()

    plt.subplot(1,3,2)
    sns.distplot(y_train - y_train_pred, bins = 20, label = 'train')
    sns.distplot(y_test - y_test_pred, bins = 20, label = 'test')
    plt.xlabel('Errores')
    plt.legend()

    ax = plt.subplot(1,3,3)
    ax.scatter(y_test,y_test_pred, s =2)

    lims = [
    np.min([ax.get_xlim(), ax.get_ylim()]),  
    np.max([ax.get_xlim(), ax.get_ylim()]),  
    ]

    ax.plot(lims, lims, 'k-', alpha=0.75, zorder=0)
    plt.xlabel('y (test)')
    plt.ylabel('y_pred (test)')

    plt.tight_layout()
    plt.show()
```

Vamos a agregar al dataset, `X`, nuevos atributos polinómicos:
$x^2, x^3$ y $x^4$ y volver a ajustar la regresión lineal. Esto lo
haremos ahora de manera manual, pero para eso emplearemos posteriormente
polynomial features.

``` python
for idx,potencia_maxima in enumerate(range(1,6)):
    print(f'Regresión con atributos polinómicos de grado {idx + 1}')
    print(f'Agregamos atributos hasta la potencia x**{potencia_maxima}')
    
    X = x.reshape(-1,1)
    for potencia in range(2,potencia_maxima+1):
        X = np.hstack((X,(x**potencia).reshape(-1,1)))
    print(f'Los atributos tienen forma: {X.shape}')
    
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.25, random_state=42)
    
    ### ENTRENAMOS
    reg = LinearRegression()
    reg.fit(X_train, y_train)
    
    
    ### COMPLETAR AQUI PARA RESOLVER CHALLENGE
    print(f'Pendientes: {reg.coef_}')
    print(f'Ordenada: {reg.intercept_}')
    
    evaluar_regresion(reg, x,y, X_train, X_test, y_train, y_test)
```

    Regresión con atributos polinómicos de grado 1
    Agregamos atributos hasta la potencia x**1
    Los atributos tienen forma: (300, 1)
    Pendientes: [0.05085927]
    Ordenada: 1.688128420334655
    Raíz del error cuadrático medio en Train: 0.5404531775884659
    Raíz del error cuadrático medio en Test: 0.5177595281278552

<img src="/m5/2/4e97c92e429efae4a427f0cd9ae16fb149fc3e27.png" alt="lasso and ridge" >

    Regresión con atributos polinómicos de grado 2
    Agregamos atributos hasta la potencia x**2
    Los atributos tienen forma: (300, 2)
    Pendientes: [0.02607102 1.70351177]
    Ordenada: 1.116168794920862
    Raíz del error cuadrático medio en Train: 0.15848610430560867
    Raíz del error cuadrático medio en Test: 0.17325345285867874



<img src="/m5/2/aff79859085bba076349f8c2f1c9ec4b83552a1b.png" alt="lasso and ridge" >

    Regresión con atributos polinómicos de grado 3
    Agregamos atributos hasta la potencia x**3
    Los atributos tienen forma: (300, 3)
    Pendientes: [ 0.04142389  1.70351723 -0.02517183]
    Ordenada: 1.1162488381125932
    Raíz del error cuadrático medio en Train: 0.15844108191156944
    Raíz del error cuadrático medio en Test: 0.17294066298395136


<img src="/m5/2/d2a10afae038670a2c5e0afe4d74087ddbbf3dce.png" alt="lasso and ridge" >

    Regresión con atributos polinómicos de grado 4
    Agregamos atributos hasta la potencia x**4
    Los atributos tienen forma: (300, 4)
    Pendientes: [ 0.0480484   3.07415436 -0.03668989 -1.60363094]
    Ordenada: 0.9844888001563212
    Raíz del error cuadrático medio en Train: 0.09875283178760554
    Raíz del error cuadrático medio en Test: 0.09788538709790894



<img src="/m5/2/ad461aba05005790331a97601b54d10247a3e9b5.png" alt="lasso and ridge" >

    Regresión con atributos polinómicos de grado 5
    Agregamos atributos hasta la potencia x**5
    Los atributos tienen forma: (300, 5)
    Pendientes: [ 0.11284967  3.07413462 -0.33425884 -1.6029657   0.26572799]
    Ordenada: 0.9846106329270569
    Raíz del error cuadrático medio en Train: 0.09818890679326656
    Raíz del error cuadrático medio en Test: 0.09890268561605829


<img src="/m5/2/15b38f718e1aa41d2618ec4df36ff95fa23cff49.png" alt="lasso and ridge" >

``` python
# Utilizamos polynomial features

from sklearn.preprocessing import PolynomialFeatures

X = x.reshape(-1,1)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, random_state=42)

poly = PolynomialFeatures(7, include_bias=False)
X_train_new = poly.fit_transform(X_train)
X_test_new = poly.fit_transform(X_test)
print(X_train_new.shape)
print(X_test_new.shape)
```

    (225, 7)
    (75, 7)

``` python
# Instanciamos una regresión
reg_2 = LinearRegression()

# Entrenamos
reg_2.fit(X_train_new, y_train)

# Observamos sus parámetros
print(reg_2.coef_)
print(reg_2.intercept_)

#Predecimos
y_train_pred_2 = reg_2.predict(X_train_new)
y_test_pred_2 = reg_2.predict(X_test_new)
```

    [ 0.12975538  3.29559363 -0.48649106 -2.25732622  0.60299841  0.47329532
        -0.20838129]
    0.9744198125665803

``` python
evaluar_regresion(reg_2, x,y, X_train_new, X_test_new, y_train, y_test)
```

    Raíz del error cuadrático medio en Train: 0.09770634561584962
    Raíz del error cuadrático medio en Test: 0.0995797030978299

<img src="/m5/2/716d48238eaecdf2113f2a7774dd13297b715589.png" alt="lasso and ridge" >

``` python
# Regularización Ridge

from sklearn.linear_model import Ridge

reg_ridge = Ridge(alpha= 1)
reg_ridge.fit(X_train_new,y_train)

print(f'Pendientes: {reg_ridge.coef_}')
print(f'Ordenada: {reg_ridge.intercept_}')
```

    Pendientes: [ 0.04577972  1.84402936 -0.05419083  0.17537793  0.00185148 -0.53178032
      0.03588905]
    Ordenada: 1.1115928964286899

``` python
evaluar_regresion(reg_ridge, x,y, X_train_new, X_test_new, y_train, y_test)
```

    Raíz del error cuadrático medio en Train: 0.13137210586137252
    Raíz del error cuadrático medio en Test: 0.1422879671361221


<img src="/m5/2/099daa6363139008e6b6fd97deaf455dbe25fa8d.png" alt="lasso and ridge" >

``` python
# Regularización Lasso

from sklearn.linear_model import Lasso
reg_lasso = Lasso(alpha = 0.0002)
reg_lasso.fit(X_train_new,y_train)

print(reg_lasso.coef_, reg_lasso.intercept_)
y_train_pred_lasso = reg_lasso.predict(X_train_new)
y_test_pred_lasso = reg_lasso.predict(X_test_new)
```

    [ 5.17681136e-02  3.01415423e+00 -6.73262915e-02 -1.53338496e+00
      0.00000000e+00 -2.94544234e-03  4.20241520e-02] 0.9907140324813473

``` python
evaluar_regresion(reg_lasso, x,y, X_train_new, X_test_new, y_train, y_test)
```

    Raíz del error cuadrático medio en Train: 0.09867453441486827
    Raíz del error cuadrático medio en Test: 0.09939211244903602


<img src="/m5/2/d0b741e429169bbf5f322eac7a7d11bfe2e03d83.png" alt="lasso and ridge" >

``` python
x_nuevo_rango = np.linspace(-2,2,1000)
y_nuevo_rango = -1.5*x_nuevo_rango**4+3*x_nuevo_rango**2+1

plt.plot(x_nuevo_rango, y_nuevo_rango, '--')
plt.xlabel('x')
plt.ylabel('y')
plt.show()
```

<img src="/m5/2/1040ab8b31c120415bc431de866fc656a98d453b.png" alt="lasso and ridge" >

``` python
X_nuevo_rango = poly.fit_transform(x_nuevo_rango.reshape(-1,1))

plt.plot(x_nuevo_rango, y_nuevo_rango, '--', label = 'Curva teórica')
plt.plot(x_nuevo_rango, reg_2.predict(X_nuevo_rango), label = 'Regresión sin regularización')
plt.plot(x_nuevo_rango, reg_ridge.predict(X_nuevo_rango), label = 'Ridge')
plt.plot(x_nuevo_rango, reg_lasso.predict(X_nuevo_rango), label = 'Lasso')
plt.legend()

plt.xlim(-2.5,2.5)
plt.ylim(-10,10)

plt.xlabel('x')
plt.ylabel('y')
plt.show()
```

<img src="/m5/2/9f719de637f361492104352f92e20d484de45a74.png" alt="lasso and ridge" >
