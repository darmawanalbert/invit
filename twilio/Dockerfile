FROM python:3.10-buster

RUN mkdir /twilio
ADD . /twilio
WORKDIR /twilio

RUN curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | python -
RUN pip3 install poetry
RUN poetry install
RUN chmod +x entrypoint.sh

ENTRYPOINT [ "poetry", "run", "/twilio/entrypoint.sh" ]