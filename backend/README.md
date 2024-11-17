# RocQuieter-backend

## Prerequisites

```
python > 3.10.0
serviceAccountKey.json from Google Firebase, ask @goodudetheboy for more info
```

## Steps to run

### Setting up environment

Follow these steps to set up the Python environment to run this backend:

1. `cd` to this folder (`backend`)

2. Create and activate Python virtual environement `venv` folder with

```bash
python -m venv venv
source venv/Scripts/activate
```

3. Install requirements

```bash
pip install -r requirements.txt
```

Once done, you should be set for developments

### Running backend

Simply run
```bash
python main.py
```

Then you should start the Flask server up. Depending on the local network setup, you should be able to access it with the provided URL (just don't use the 127.0.0.1 one)